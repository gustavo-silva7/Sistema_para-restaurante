// server.js - CONFIGURAÇÃO EXCLUSIVA PARA TESTES LOCAL
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🚨 INSERIR AQUI O SEU ACCESS TOKEN DE TESTE (COMEÇA COM 'TEST-...')
const client = new MercadoPagoConfig({ 
    accessToken: 'COLE_AQUI_O_SEU_TEST_TOKEN' 
});

app.post('/api/criar-checkout', async (req, res) => {
    try {
        const { carrinho } = req.body;

        if (!carrinho || carrinho.length === 0) {
            return res.status(400).json({ error: 'O carrinho está vazio.' });
        }

        // Mapeia os itens vindos do front-end
        const items = carrinho.map(item => ({
            id: String(item.id),
            title: item.nome,
            unit_price: Number(item.preco),
            quantity: Number(item.quantidade),
            currency_id: 'BRL'
        }));

        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: items,
                back_urls: {
                    success: 'http://localhost:3000/sucesso',
                    failure: 'http://localhost:3000/falha',
                    pending: 'http://localhost:3000/pendente'
                },
                auto_return: 'approved',
                // Força o ambiente de testes (sandbox)
                sandbox: true 
            }
        });

        // Retorna o link da tela de testes
        res.json({ init_point: result.init_point });

    } catch (error) {
        console.error("Erro detectado no servidor:", error);
        res.status(500).json({ error: 'Erro ao processar o pagamento fictício.' });
    }
});

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` 🚀 MODO DE TESTES ATIVO - PORTA CORRETA: ${PORT}`);
    console.log(`====================================================`);
});