import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateProdutoService } from '../../services/produto/UpdateProdutoService';

interface UpdateProdutoProps {

    descricao: string,
    qtd_minima: number,
    barra: string
}

class UpdateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.query as { id: string }

        const { descricao, qtd_minima, barra } = request.body as UpdateProdutoProps;

        const produtoService = new UpdateProdutoService();

        const produto = await produtoService.execute({ id, descricao, qtd_minima, barra });

        reply.send(produto);
    }
}

export { UpdateProdutoController }
