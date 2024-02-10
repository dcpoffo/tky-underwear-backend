import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateProdutoService } from '../../services/produto/UpdateProdutoService';

interface UpdateProdutoProps {

    descricao: string,    
    barra: string
}

class UpdateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.query as { id: string }

        const { descricao, barra } = request.body as UpdateProdutoProps;

        const produtoService = new UpdateProdutoService();

        const produto = await produtoService.execute({ id, descricao, barra });

        reply.send(produto);
    }
}

export { UpdateProdutoController }
