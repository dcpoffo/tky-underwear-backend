import prismaClient from "../../prisma";

interface CreateProdutoProps {
    descricao: string,    
    tipo: string,
    modelagem: string,
    grade: string,
    barra: string,
    qtdEstoque: number
}

class CreateProdutoService {

    async execute({ descricao, tipo, modelagem, grade, barra, qtdEstoque }: CreateProdutoProps){
        
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

        if (!qtdEstoque) {
            qtdEstoque = 0;
        }

        const produto = await prismaClient.produto.create({
            data: {
                descricao,
                tipo,
                modelagem,
                grade,
                barra, 
                qtdEstoque
            }
        })

        return produto
    }
}

export { CreateProdutoService };
