import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";

interface CreateProdutoProps {
    descricao: string,    
    barra: string
}

class CreateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { descricao, barra } = request.body as CreateProdutoProps;
       
        const produtoService = new CreateProdutoService();

        const produto = await produtoService.execute({descricao, barra});

        reply.send(produto);
    }
}

export { CreateProdutoController }
