import prismaClient from "../../prisma";

class ListMovimentacoesService {
    async execute() {

        const customers = await prismaClient.movimentacao.findMany();

        return customers;
    }
}

export { ListMovimentacoesService }