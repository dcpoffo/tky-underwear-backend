import prismaClient from "../../prisma";

class ListProdutosService {
    async execute() {

        const produtos = await prismaClient.produto.findMany(
            {
                orderBy:
                {
                    descricao: 'asc',
                    modelagem: 'asc',
                    tipo: 'asc',
                    id: 'asc'
                },
                //descricao, modelagem, tipo, id
            }
        );

        return produtos;
    }
}

export { ListProdutosService }