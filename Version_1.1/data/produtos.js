//ESTRUTURA DO CARDAPIO
const produtos = [
    {
        id: 1,
        nome: "Lasanha",
        preco: 31.95,
        imagem: "img/lasanha.jpeg",
        descricao: "Lasanha tradicional"
    },

    {
        id: 2,
        nome: "Strogonoff",
        preco: 28.91,
        imagem: "img/estrogonofe.jpeg",
        descricao: "Acompanha arroz"
    },

    {
        id: 3,
        nome: "Prato Executivo",
        preco: 25.73,
        imagem: "img/Prato Executivo.jpeg",
        descricao: "Prato feito"
    },

      {
        id: 4,
        nome: "Bacon Cheeseburguer",
        preco: 32.93,
        imagem: "img/hamburguer.jpeg",
        descricao: "Hamburguer de queijo com bacon"
    }
    
];
const carrinho = [];

const cardapio = document.getElementById("cardapio");
const carrinhoHTML = document.getElementById("carrinho");
const totalHTML = document.getElementById("total");

//RENDERIZAÇÃO DO CARDAPIO
function renderProduto(){
produtos.forEach((produto) => {

  cardapio.innerHTML += `

    <div class="item">
    <div class="DescricaoProduto">
      <h3>${produto.nome}</h3>
      <span>${produto.preco}</span>
      <p>${produto.descricao}</p>
    </div>

    <div>
      <img src = "${produto.imagem}" class= "ImgProduto">
    </div>

    <div class="controle">
      <button class="ButtonMenos"> - </button>
      <span class="quantidade"> 0 </span>
      <button class="ButtonMais"> + </button>
    </div>
  </div>

  `;

});
} //Fim da função renderProduto


//RENDERIZAR ITENS QIE ESTÃO NO CARRINHO
function renderCarrinho(){
  carrinhoHTML.innerHTML = "";
  let total = 0;
  carrinho.forEach((item) => {
    total += item.preco * item.quantidade;
    carrinhoHTML.innerHTML += `
      <div>
        <h3>
          ${item.nome}
        </h3>
        <p>
          Quantidade: ${item.quantidade}
        </p>
        <p>
          Subtotal:
          R$ ${item.preco * item.quantidade}
        </p>
      </div>
    `;
  });

  totalHTML.innerText =
  `Total: R$ ${total}`;
}
renderProduto();
