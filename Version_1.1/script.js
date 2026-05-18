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
