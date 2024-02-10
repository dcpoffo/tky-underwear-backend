import prismaClient from "../../prisma";

interface CreateProdutoProps {
    descricao: string,    
    barra: string
}

class CreateProdutoService {

    async execute({descricao, barra}: CreateProdutoProps){
        
        if (!descricao) {
            throw new Error("Preencha a descrição");
        }

        const produto = await prismaClient.produto.create({
            data: {
                descricao,
                barra
            }
        })

        return produto
    }
}

export { CreateProdutoService };
