import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateProdutoController } from "./controllers/produto/CreateProdutoController"
import { ListProdutosController } from "./controllers/produto/ListProdutosController"
import { ListMovimentacoesController } from "./controllers/movimentacao/ListMovimentacoesController"

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { OK: true }
    })

    //Produtos

    fastify.get("/produtos", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListProdutosController().handle(request, reply);
    })

    fastify.post("/produto", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateProdutoController().handle(request, reply);
    })

    fastify.delete("/produto", async (request: FastifyRequest, reply: FastifyReply) => {
        return null;
    })

    //Movimentações
    fastify.get("/movimentacoes", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListMovimentacoesController().handle(request, reply);
    })

}