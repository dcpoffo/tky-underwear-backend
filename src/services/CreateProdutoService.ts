import prismaClient from "../prisma";

interface CreateProdutoProps {
    descricao: string,
    qtd_minima: number,
    barra: string
}

class CreateProdutoService {

    async execute({descricao, qtd_minima, barra}: CreateProdutoProps){
        
        if (!descricao) {
            throw new Error("Preencha a descrição");
        }

        const produto = await prismaClient.produto.create({
            data: {
                descricao,
                qtd_minima,
                barra
            }
        })

        return produto
    }
}

export { CreateProdutoService };
