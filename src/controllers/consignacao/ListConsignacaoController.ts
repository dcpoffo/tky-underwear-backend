import { FastifyReply, FastifyRequest } from "fastify";
import { ListConsignacaoService } from "../../services/consignacao/ListConsignacaoService";

class ListConsignacaoController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const listConsignacaoService = new ListConsignacaoService();

        const vendas = await listConsignacaoService.execute();

        reply.send(vendas);
        
    }
}

export { ListConsignacaoController }