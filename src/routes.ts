import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateProdutoController } from "./controllers/produto/CreateProdutoController"
import { ListProdutosController } from "./controllers/produto/ListProdutosController"
import { ListMovimentacoesController } from "./controllers/movimentacao/ListMovimentacoesController"
import { CreateMovimentacaoController } from "./controllers/movimentacao/CreateMovimentacaoController"
import { DeleteProdutoController } from "./controllers/produto/DeleteProdutoController"
import { DeleteMovimentacaoController } from "./controllers/movimentacao/DeleteMovimentacaoController"
import { UpdateProdutoController } from "./controllers/produto/UpdateProdutoController"
import { UpdateMovimentacaoController } from "./controllers/movimentacao/UpdateMovimentacaoController"
import { ListCorController } from "./controllers/cor/ListCorController"
import { CreateCorController } from "./controllers/cor/CreateCorController"


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
        return new DeleteProdutoController().handle(request, reply);
    })

    fastify.put("/produto", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateProdutoController().handle(request, reply);
    })

/////////////////////////////////////////////////

    //Movimentações
    fastify.get("/movimentacoes", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListMovimentacoesController().handle(request, reply);
    })

    fastify.post("/movimentacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateMovimentacaoController().handle(request, reply);
    })

    fastify.delete("/movimentacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteMovimentacaoController().handle(request, reply);
    })

    fastify.put("/movimentacao", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateMovimentacaoController().handle(request, reply);
    })

    /////////////////////////////////////////////////

    //Cores
    fastify.get("/cores", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCorController().handle(request, reply);
    })

    fastify.post("/cor", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCorController().handle(request, reply);
    })

    // fastify.delete("/cor", async (request: FastifyRequest, reply: FastifyReply) => {
    //     return new DeleteCorController().handle(request, reply);
    // })

    // fastify.put("/cor", async (request: FastifyRequest, reply: FastifyReply) => {
    //     return new UpdateCorController().handle(request, reply);
    // })
    

}