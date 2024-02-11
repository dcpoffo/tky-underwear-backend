import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteCorService } from '../../services/cor/DeleteCorService';


class DeleteCorController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const corService = new DeleteCorService();

        const cor = await corService.execute({ id })

        reply.send(cor);

    }

}

export { DeleteCorController }