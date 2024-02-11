import { FastifyRequest, FastifyReply} from 'fastify';
import { CreateCorService } from '../../services/cor/CreateCorService';

interface CreateCorProps {
    descricao: string;
}

class CreateCorController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {descricao} = request.body as CreateCorProps;

        const corService = new CreateCorService();

        const cor = await corService.execute({descricao});

        reply.send(cor);
    }

}

export {CreateCorController}