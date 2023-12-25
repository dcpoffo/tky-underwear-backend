import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProdutoService } from "../services/CreateProdutoService";

interface CreateProdutoProps {
    descricao: string,
    qtd_minima: number,
    barra: string
}

class CreateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { descricao, qtd_minima, barra } = request.body as CreateProdutoProps;
       
        const produtoService = new CreateProdutoService();

        const produto = await produtoService.execute({descricao, qtd_minima, barra});

        reply.send(produto);
    }
}

export { CreateProdutoController }
