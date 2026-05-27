//FUNÇÃO PARA ADICIONAR ITEM AO CARRINHO
function adicionarCarrinho(produtoId) {

  const produtoExistente =
  carrinho.find((item) => {
    return item.id === produtoId;

  });

  if(produtoExistente){
    produtoExistente.quantidade++;
  }

  else{

    const produto =
    produtos.find((p) => {

      return p.id === produtoId;

    });

    carrinho.push({

      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1

    });

  }

  renderCarrinho();
} //Fim da Funçao adicionarCarrinho

//FUNÇAO PARA REMOVER ITENS DO CARRINHO
function removerCarrinho(produtoId){

  const produto =
  carrinho.find((item) => {
    return item.id === produtoId;
  });

  if(produto){
    produto.quantidade--;

    if(produto.quantidade <= 0){
      const index =
      carrinho.findIndex((item) => {
        return item.id === produtoId;
      });
      carrinho.splice(index, 1);
    }
  }
  renderCarrinho();
} //Fim da Funçao removerCarrinho


//BOTOES DE ADICIONAR E REMOVER ITENS DO CARRINHO
const items = document.querySelectorAll(".item");

items.forEach((item, index) => {
  
    let quantidade = 0;
    const ButtonMais = item.querySelector(".ButtonMais");
    const ButtonMenos = item.querySelector(".ButtonMenos");
    const quantidadeHTML = item.querySelector(".quantidade");


    ButtonMais.addEventListener("click", () => {
        quantidade ++,
        quantidadeHTML.innerText = quantidade;
        console.log("Botao mais clicado!");

        adicionarCarrinho(
            produtos[index].id,
            console.log("produto adicionado")     
        )
        });

    ButtonMenos.addEventListener("click", () => {
        if(quantidade > 0){
            quantidade--;
            quantidadeHTML.innerText = quantidade;
            console.log("Botao menos clicado!");

            removerCarrinho(
                produtos[index].id,
                console.log("item removido")
            );
        }
    });
});


// Evento do botão de finalizar compra
document.getElementById("btn-finalizar").addEventListener("click", async () => {
  if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

  // Desativa o botão temporariamente para evitar cliques duplos
  const btn = document.getElementById("btn-finalizar");
  btn.innerText = "Processando...";
  btn.disabled = true;

  try {
    // Enviando o carrinho para o nosso servidor Back-end
    const response = await fetch('http://localhost:3000/api/criar-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carrinho: carrinho })
    });

    const dados = await response.json();

    if (dados.init_point) {
      // Redireciona o cliente para a página de pagamento segura (ex: Mercado Pago)
      window.location.href = dados.init_point;
    } else {
      alert("Houve um erro ao gerar o link de pagamento.");
      btn.innerText = "Finalizar e Pagar no Site";
      btn.disabled = false;
    }

  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Não foi possível conectar ao servidor de pagamento.");
    btn.innerText = "Finalizar e Pagar no Site";
    btn.disabled = false;
  }
});