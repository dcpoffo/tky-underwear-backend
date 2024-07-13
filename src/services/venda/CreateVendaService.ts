import prismaClient from "../../prisma";

interface CreateVendaProps {
    valorVenda?: number, // permitir que o valorVenda seja opcional
    itensVenda: ItensVendaProps[],
    descricao: string,
    consignacao?: boolean,
}

interface ItensVendaProps {
    idProduto: number,
    quantidade: number,
    valorUnitario: number,
    total: number
}

class CreateVendaService {

    async execute({ itensVenda, descricao, consignacao }: CreateVendaProps) {

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
                    descricao,
                    valorVenda,
                    consignacao,
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
            console.log("Venda criada")             

            // se não for venda consignada, cria movimentação e atualiza estoque
            if (!consignacao) {            
                //criar uma movimentação de saida do estoque            
                const movimentacao = await prismaClient.movimentacaoEstoque.create({
                    data: {
                        tipo: "1",
                        descricao: `Ref. venda: ${vendas.id}\nR$ ${valorVenda.toFixed(2)}\n${descricao}`,
                        itensMovimentacaoEstoque: {
                            create: itensVenda.map(item => ({
                                idProduto: item.idProduto,
                                quantidade: item.quantidade
                            }))
                        }
                    },
                    include: {
                        itensMovimentacaoEstoque: true
                    },
                });
                console.log("Movimentação criada")

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
                console.log("Estoque atualizado")
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
