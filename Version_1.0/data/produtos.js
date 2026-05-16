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
    }
    
];


const cardapio =
document.getElementById("cardapio");

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