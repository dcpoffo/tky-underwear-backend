import { FastifyReply, FastifyRequest } from "fastify"
import { CreateVendaService } from "../../services/venda/CreateVendaService";

interface CreateVendaProps {
    valorVenda: number,
    itensVenda: ItensVendaProps[],
    descricao: string,
    consignacao: boolean,
}

interface ItensVendaProps {
    idProduto: number,
    quantidade: number,
    valorUnitario: number,
    total: number
}

class CreateVendaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const {valorVenda, itensVenda, descricao, consignacao} = request.body as CreateVendaProps;
        
        const vendaService = new CreateVendaService();

        const venda = await vendaService.execute({valorVenda, itensVenda, descricao, consignacao});

        reply.send(venda);
    }
}

export { CreateVendaController }
