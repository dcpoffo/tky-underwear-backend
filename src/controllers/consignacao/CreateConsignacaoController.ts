import { FastifyReply, FastifyRequest } from "fastify";
import { CreateConsignacaoService } from "../../services/consignacao/CreateConsignacaoService";

interface CreateConsignacaoProps {
    descricao: string,
    itensConsignacao: ItensConsignacaoProps[]
}

interface ItensConsignacaoProps {
    idProduto: number,
    quantidade: number
}

class CreateConsignacaoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const {descricao, itensConsignacao} = request.body as CreateConsignacaoProps;

        const consignacaoService = new CreateConsignacaoService();

        const venda = await consignacaoService.execute({descricao, itensConsignacao});

        reply.send(venda);
    }
}

export { CreateConsignacaoController };

