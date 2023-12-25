import { FastifyRequest, FastifyReply } from "fastify"
import { ListProdutosService } from "../services/ListProdutosService"

class ListProdutosController {
    async handle(request:FastifyRequest, reply: FastifyReply) {
        const listProdutosService = new ListProdutosService();

        const produtos = await listProdutosService.execute();

        reply.send(produtos)
    }
}

export { ListProdutosController }