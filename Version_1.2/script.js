//Vamos organizar essa bagaça
//Variavei globais e o estado da aplicação
const carrinho = [];
const cardapio = document.getElementById("cardapio");
const carrinhoHTML = document.getElementById("carrinho");
const totalHTML = document.getElementById("total");
const btnFinalizar = document.getElementById("btn-finalizar")

//RENDERIZAR O CARDAPIO DE FORMA DINAMICA
function renderProduto(){
  cardapio.innerHTML = "<h3>CARDAPIO</h3>" //Só pra manter o titulo original

  produtos.forEach((produto) => {
    cardapio.innerHTML += `
      <div class="item" data-id="${produto.id}">
      <div class="DescricaoProduto">
        <h3>${produto.nome}</h3>
        <span>${produto.preco.toFixed(2)}</span>
        <p>${produto.descricao}</p>
      </div>
      <div>
        <img src = "${produto.imagem}" class= "ImgProduto" alt=${produto.nome}>
      </div>
      <div class="controle">
        <button class="ButtonMenos"> - </button>
        <span class="quantidade"> 0 </span>
        <button class="ButtonMais"> + </button>
      </div>
    </div>
    `});
    configurarBotoesCardapio() //Os botões só existem após o innerHTML ser preenchido. Por isso, chamamos a configuração dos cliques imediatamente aqui.
  } //Fim da função renderProduto

//CONFIGURAROS EVENTOS DE CLIQUE DOS BOTOES
function configurarBotoesCardapio(){
  const itemsDOM = document.querySelectorAll(".item");

  itemsDOM.forEach((itemDOM) => {
  // Captura o ID do produto diretamente do atributo HTML correspondente
    const produtoId = parseInt(itemDOM.getAttribute("data-id"));
    const btnMais = itemDOM.querySelector(".ButtonMais");
    const btnMenos = itemDOM.querySelector(".ButtonMenos");
    const quantidadeHTML = itemDOM.querySelector(".quantidade");

    console.log("Ids capturados com sucesso") //Apenas verificação

    btnMais.addEventListener("click", () => {
      adicionarCarrinho(produtoId);
      //mosta o contador visual no site
      const itemNoCarrinho = carrinho.find(i => i.id === produtoId);
      quantidadeHTML.innerText = itemNoCarrinho ? itemNoCarrinho.quantidade : 0
    });

    btnMenos.addEventListener("click", () => {
      removerCarrinho(produtoId);
      //mosta o contador visual no site ou zera se foi removido
      const itemNoCarrinho= carrinho.find(i => i.id === produtoId)
      quantidadeHTML.innerText = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
    });
  });
}

//FUNÇÃO PARA ADICIONAR ITEM AO CARRINHO
function adicionarCarrinho(produtoId) {
  const produtoExistente = carrinho.find(item => item.id === produtoId);
  if (produtoExistente){
    produtoExistente.quantidade++
  }else{
    const produto = produtos.find(p => p.id === produtoId)
    if (produto){
      carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      })
    }
  }
  console.log("Botao + clicado e produto adicionado")
  renderCarrinho()
} //Fim da Funçao adicionarCarrinho


//FUNÇAO PARA REMOVER ITENS DO CARRINHO
function removerCarrinho(produtoId){
  const produtoExistente = carrinho.find(item => item.id === produtoId);

  if (produtoExistente) {
    produtoExistente.quantidade--;

    if (produtoExistente.quantidade <= 0) {
      const index = carrinho.findIndex(item => item.id === produtoId);
      carrinho.splice(index, 1);
    }
  }
  console.log("Botao - clicado e produto removido")
  renderCarrinho()
} //Fim da Funçao removerCarrinho


//RENDERIZAR ITENS QUE ESTÃO NO CARRINHO
function renderCarrinho(){
  carrinhoHTML.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0 ){
    carrinhoHTML.innerHTML = "Nenhum item no carrinho ainda.";
    totalHTML.innerText = "Total: R$ 0,00";
    btnFinalizar.style.display = "none";
    return;
  }

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    
    carrinhoHTML.innerHTML += `
      <div class="item-carrinho">
        <h3>${item.nome}</h3>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      </div>
    `;
  });

  totalHTML.innerText = `Total: R$ ${total.toFixed(2)}`;
  btnFinalizar.style.display = "block"; // Exibe o botão quando há itens
}

// A partir desse ponto eu não mais oq vou
// Evento do botão de finalizar compra
btnFinalizar.addEventListener("click", async () => {
  if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

  btnFinalizar.innerText = "Processando...";
  btnFinalizar.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/api/criar-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carrinho: carrinho })
    });

    const dados = await response.json();

    if (dados.init_point) {
      window.location.href = dados.init_point;
    } else {
      alert("Houve um erro ao gerar o link de pagamento.");
      btnFinalizar.innerText = "Finalizar e Pagar no Site";
      btnFinalizar.disabled = false;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Não foi possível conectar ao servidor de pagamento.");
    btnFinalizar.innerText = "Finalizar e Pagar no Site";
    btnFinalizar.disabled = false;
  }
});

// INICIALIZAÇÃO AUTOMÁTICA DO SISTEMA
renderProduto();