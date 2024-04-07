import { FastifyRequest, FastifyReply } from "fastify"
import { ListMovimentacaoEstoqueService } from "../../services/movimentaEstoque/ListMovimentacaoEstoqueService";


class ListMovimentacaoEstoqueController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const listMovimentacaoEstoqueService = new ListMovimentacaoEstoqueService();

        const movimentacoes = await listMovimentacaoEstoqueService.execute();

        reply.send(movimentacoes)
    }
}

export { ListMovimentacaoEstoqueController }