import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateCorService } from '../../services/cor/UpdateCorService';

interface UpdateCorProps {
    descricao: string
}

class UpdateCorController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id} = request.query as { id: string}

        const { descricao} = request.body as UpdateCorProps;

        const corService = new UpdateCorService();

        const cor = await corService.execute({id, descricao});

        reply.send(cor);
    }
}

export { UpdateCorController }