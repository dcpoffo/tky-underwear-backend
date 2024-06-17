import { FastifyReply, FastifyRequest } from "fastify"
import { CreateVendaService } from "../../services/venda/CreateVendaService";

interface CreateVendaProps {
    valorVenda: number,
    itensVenda: ItensVendaProps[]
}

interface ItensVendaProps {
    idProduto: number,
    quantidade: number,
    valorUnitario: number,
    total: number
}

class CreateVendaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const {valorVenda, itensVenda} = request.body as CreateVendaProps;
        
        const vendaService = new CreateVendaService();

        const venda = await vendaService.execute({valorVenda, itensVenda});

        reply.send(venda);
    }
}

export { CreateVendaController }
