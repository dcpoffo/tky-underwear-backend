import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateProdutoService } from '../../services/produto/UpdateProdutoService';

interface UpdateProdutoProps {
    descricao: string,
    tipo: string,
    modelagem: string,
    grade: string,
    barra: string
}

class UpdateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.query as { id: string }

        const { descricao, tipo, modelagem, grade, barra } = request.body as UpdateProdutoProps;

        const produtoService = new UpdateProdutoService();

        const produto = await produtoService.execute({ id, descricao, tipo, modelagem, grade, barra });

        reply.send(produto);
    }
}

export { UpdateProdutoController }
