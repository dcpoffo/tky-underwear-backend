import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";

interface CreateProdutoProps {
    descricao: string,    
    tipo: string,
    modelagem: string,
    grade: string,
    barra: string
    
}

class CreateProdutoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { descricao, tipo, modelagem, grade, barra } = request.body as CreateProdutoProps;
       
        const produtoService = new CreateProdutoService();

        const produto = await produtoService.execute({descricao, tipo, modelagem, grade, barra});

        reply.send(produto);
    }
}

export { CreateProdutoController }
