import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { CreateMovimentacaoEstoqueController } from "./controllers/movimentaEstoque/CreateMovimentacaoEstoqueController"
import { ListMovimentacaoEstoqueController } from "./controllers/movimentaEstoque/ListMovimentacaoEstoqueController"
import { CreateMovimentacaoController } from "./controllers/movimentacao/CreateMovimentacaoController"
import { DeleteMovimentacaoController } from "./controllers/movimentacao/DeleteMovimentacaoController"
import { ListMovimentacoesController } from "./controllers/movimentacao/ListMovimentacoesController"
import { UpdateMovimentacaoController } from "./controllers/movimentacao/UpdateMovimentacaoController"
import { CreateProdutoController } from "./controllers/produto/CreateProdutoController"
import { DeleteProdutoController } from "./controllers/produto/DeleteProdutoController"
import { ListProdutosController } from "./controllers/produto/ListProdutosController"
import { UpdateProdutoController } from "./controllers/produto/UpdateProdutoController"
import { ListVendaController } from "./controllers/venda/ListVendaController"
import { CreateVendaController } from "./controllers/venda/CreateVendaController"

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

    //Movimentações de Estoque
    fastify.get("/estoque", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListMovimentacaoEstoqueController().handle(request, reply);
    })

    fastify.post("/estoqueMove", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateMovimentacaoEstoqueController().handle(request, reply);
    })  

    //Vendas
    fastify.get("/vendas", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListVendaController().handle(request, reply);
    })

    fastify.post("/vendas", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateVendaController().handle(request, reply);
    })  
    

}