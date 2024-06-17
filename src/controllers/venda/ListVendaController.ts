import { FastifyReply, FastifyRequest } from "fastify";
import { ListVendaService } from "../../services/venda/ListVendaService";

class ListVendaController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const listVendaService = new ListVendaService();

        const vendas = await listVendaService.execute();

        reply.send(vendas)

    }
}

export { ListVendaController }