const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Permite que seu front-end acesse o back-end

// Cópia de segurança dos seus produtos para validação de preço no servidor
const produtosServidor = [
    { id: 1, nome: "Lasanha", preco: 31.95 },
    { id: 2, nome: "Strogonoff", preco: 28.91 },
    { id: 3, nome: "Prato Executivo", preco: 25.73 },
    { id: 4, nome: "Bacon Cheeseburguer", preco: 32.93 }
];

app.post('/api/criar-checkout', async (req, res) => {
    const { carrinho } = req.body;

    // Monta a estrutura exigida pelas APIs de pagamento (ex: Mercado Pago / Stripe)
    const itensCheckout = carrinho.map(itemCarrinho => {
        const produtoOriginal = produtosServidor.find(p => p.id === itemCarrinho.id);
        return {
            title: produtoOriginal.nome,
            quantity: itemCarrinho.quantidade,
            unit_price: produtoOriginal.preco,
            currency_id: 'BRL'
        };
    });

    try {
        // AQUI você integrará a biblioteca do Mercado Pago ou Stripe futuramente.
        // Por enquanto, simulamos o redirecionamento devolvendo uma URL de teste:
        console.log("Pedido recebido com sucesso!", itensCheckout);
        
        // Em produção, troque pela URL gerada pela API do gateway de pagamento
        res.json({ init_point: "https://www.mercadopago.com.br" }); 

    } catch (error) {
        res.status(500).json({ error: "Erro interno ao criar preferência de pagamento." });
    }
});

app.listen(3000, () => console.log("Servidor de pagamento rodando na porta 3000!"));