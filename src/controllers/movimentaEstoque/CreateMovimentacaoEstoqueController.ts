import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateMovimentacaoEstoqueService } from '../../services/movimentaEstoque/CreateMovimentacaoEstoqueService';

interface CreateMovimentacaoEstoqueProps {
    tipo: string,
    descricao: string,
    itensMovimentacaoEstoque: ItensMovimentacaoEstoqueProps[]
}

interface ItensMovimentacaoEstoqueProps {
    idProduto: number,
    quantidade: number
}

class CreateMovimentacaoEstoqueController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { tipo, descricao, itensMovimentacaoEstoque } = request.body as CreateMovimentacaoEstoqueProps;

        const movimentacaoEstoqueService = new CreateMovimentacaoEstoqueService();

        const movimentacao = await movimentacaoEstoqueService.execute({ tipo, descricao, itensMovimentacaoEstoque });

        reply.send(movimentacao);
    }
}

export { CreateMovimentacaoEstoqueController };

