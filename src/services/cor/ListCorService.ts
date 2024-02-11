import prismaClient from "../../prisma";

class ListCorService {
    async execute() {

        const cores = await prismaClient.cor.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        return cores;
    }
}

export { ListCorService}