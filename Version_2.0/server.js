// server.js - Versão Atualizada
const express = require('express');
const cors = require('cors');
// Mudança aqui: Importação de acordo com a nova biblioteca 'mercadopago'
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuração do cliente com o seu Access Token
const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-1799808565310393-052820-bc8abd15c3a8217a2b1e112df5cf6164-3434910570'
});

// app.post('/api/criar-checkout', async (req, res) => {
//     try {
//         const { carrinho } = req.body;

//         if (!carrinho || carrinho.length === 0) {
//             return res.status(400).json({ error: 'O carrinho está vazio.' });
//         }

//         // Monta a lista de itens para o Mercado Pago
//         const items = carrinho.map(item => ({
//             id: String(item.id),
//             title: item.nome,
//             unit_price: Number(item.preco),
//             quantity: Number(item.quantidade),
//             currency_id: 'BRL'
//         }));

//         // Criação da preferência usando a nova estrutura da biblioteca
//         const preference = new Preference(client);
//         const result = await preference.create({
//             body: {
//                 items: items,
//                 back_urls: {
//                     success: 'http://localhost:5500/sucesso',
//                     failure: 'http://localhost:5500/falha',
//                     pending: 'http://localhost:5500/pendente'
//                 },
//                 auto_return: 'approved',
//             }
//         });

//         // Devolve o link de pagamento para o Front-end
//         res.json({ init_point: result.init_point });

//     } catch (error) {
//         console.error("Erro no servidor:", error);
//         res.status(500).json({ error: 'Erro ao processar o pagamento.' });
//     }
// });


app.post('/api/criar-checkout', async (req, res) => {
    try {
        const { carrinho } = req.body;
        
        if (!carrinho || carrinho.length === 0) {
            return res.status(400).json({ error: 'O carrinho está vazio.' });
        }
        
        const items = carrinho.map(item => ({
            id: String(item.id),
            title: item.nome,
            unit_price: Number(item.preco),
            quantity: Number(item.quantidade),
            currency_id: 'BRL'
        }));
        
        const preference = new Preference(client);
        
        // Configuração otimizada para o ambiente de testes local
        const result = await preference.create({
            body: {
                items: items,
                back_urls: {
                    // Usamos o IP local padrão que o Mercado Pago aceita em testes
                    success: 'http://127.0.0.1:5500', 
                    failure: 'http://127.0.0.1:5500',
                    pending: 'http://127.0.0.1:5500'
                }
                // Removemos o 'auto_return' para evitar o bloqueio da API do Mercado Pago
            }
        });
        
        // Devolve o link gerado com sucesso para o front-end
        res.json({ init_point: result.init_point });
        
    } catch (error) {
        console.error("ERRO DETALHADO NO MERCADO PAGO:", error);
        res.status(500).json({ error: 'Erro ao processar o pagamento.' });
    }
    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(` SERVIDOR BACK-END RODANDO NO LINUX MINT NA PORTA ${PORT}`);
        console.log(`====================================================`);
    });
    //server.js - VERSÃO LOCAL CORRIGIDA (SEM ERRO 400)
});