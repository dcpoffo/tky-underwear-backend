import prismaClient from "../../prisma";

interface CreateVendaProps {
    valorVenda?: number, // permitir que o valorVenda seja opcional
    itensVenda: ItensVendaProps[]
}

interface ItensVendaProps {
    idProduto: number,
    quantidade: number,
    valorUnitario: number,
    total: number
}

class CreateVendaService {

    async execute({ itensVenda }: CreateVendaProps) {

        try {
            // Verificar se todos os produtos existem e têm estoque suficiente
            for (const item of itensVenda) {
                const findProduto = await prismaClient.produto.findUnique({
                    where: {
                        id: item.idProduto,
                    },
                });

                if (!findProduto) {
                    throw new Error(`Produto com Código ${item.idProduto} não existe`);
                }

                if (item.quantidade === 0) {
                    throw new Error(`No produto com Código ${item.idProduto} não foi informada a quantidade!`)
                }

                if (findProduto.qtdEstoque < item.quantidade) {
                    throw new Error(`Produto com Código ${item.idProduto} não tem quantidade suficiente em estoque. Quantidade em estoque: ${findProduto.qtdEstoque}`);
                }
            }

            // Calcular valor da venda se não foi passado como parâmetro
            const valorVenda = itensVenda.reduce((acc, item) => acc + (item.quantidade * item.valorUnitario), 0);

            const vendas = await prismaClient.venda.create({
                data: {
                    valorVenda,
                    itensDaVenda: {
                        create: itensVenda.map(item => ({
                            idProduto: item.idProduto,
                            quantidade: item.quantidade,
                            valorUnitario: item.valorUnitario,
                            total: (item.quantidade * item.valorUnitario)
                        }))
                    }
                },
                include: { 
                    itensDaVenda: true 
                },
            });

            // Atualizar o estoque dos produtos
            for (const item of itensVenda) {
                await prismaClient.produto.update({
                    where: {
                        id: item.idProduto
                    },
                    data: {
                        qtdEstoque: {
                            decrement: item.quantidade,
                        },
                    },
                });
            }

            return vendas;

        } catch (error) {
            // Captura e trata erros
            console.log("Erro ao cadastrar venda: ", error);
            throw error; // Lança o erro para ser tratado no lado do cliente
        }
    }
}

export { CreateVendaService };
