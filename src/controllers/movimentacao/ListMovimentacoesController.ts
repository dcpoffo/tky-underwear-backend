import { FastifyRequest, FastifyReply } from "fastify"
import { ListMovimentacoesService } from "../../services/movimentacao/ListMovimentacoesService";


class ListMovimentacoesController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const listMovimentacoesService = new ListMovimentacoesService();

        const movimentacoes = await listMovimentacoesService.execute();

        reply.send(movimentacoes)
    }
}

export { ListMovimentacoesController }