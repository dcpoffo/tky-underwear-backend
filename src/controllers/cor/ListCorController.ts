import { FastifyRequest, FastifyReply } from "fastify";
import { ListCorService } from "../../services/cor/ListCorService";

class ListCorController {

    async handle(request: FastifyRequest, replay: FastifyReply) {

        const listCorService = new ListCorService();

        const cores = await listCorService.execute();

        replay.send(cores);
    }
}

export { ListCorController }