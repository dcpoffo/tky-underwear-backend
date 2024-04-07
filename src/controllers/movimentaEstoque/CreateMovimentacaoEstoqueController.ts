import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateMovimentacaoEstoqueService } from '../../services/movimentaEstoque/CreateMovimentacaoEstoqueService';

interface CreateMovimentaEstoqueProps {
    idProduto: number,
    tipo: string,
    descricao: string,
    quantidade: number
}

class CreateMovimentacaoEstoqueController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { idProduto, tipo, descricao, quantidade } = request.body as CreateMovimentaEstoqueProps;

        const movimentacaoEstoqueService = new CreateMovimentacaoEstoqueService();

        const movimentacao = await movimentacaoEstoqueService.execute({ idProduto, tipo, descricao, quantidade });

        reply.send(movimentacao);
    }
}

export { CreateMovimentacaoEstoqueController };

