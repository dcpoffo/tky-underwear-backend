import prismaClient from "../../prisma";

interface UpdateProdutoProps {
    id: string,
    descricao: string,
    tipo: string,
    modelagem: string,
    grade: string,
    barra: string
}


class UpdateProdutoService {

    async execute({ id, descricao, tipo, modelagem, grade, barra }: UpdateProdutoProps) {

        if (!id) {
            throw new Error("Sem id não pode atualizar")
        }

        const findProduto = await prismaClient.produto.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findProduto) {
            throw new Error("Produto não existe")
        }       
        
        if (!descricao) {
            throw new Error("Preencha a descrição");
        }        

        if (!tipo) {
            throw new Error("Preencha o tipo");
        }

        if (!modelagem) {
            throw new Error("Preencha a modelagem");
        }

        if (!grade) {
            throw new Error("Preencha a grade");
        }

        if (!barra) {
            barra = "0";
        }

        const produto = await prismaClient.produto.update({
            where: {
                id: findProduto.id
            },

            data: {
                descricao,
                tipo, 
                modelagem,
                grade,
                barra
            }
        })

        return produto
    }

}

export { UpdateProdutoService }