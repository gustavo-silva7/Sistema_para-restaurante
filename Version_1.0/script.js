const items = document.querySelectorAll(".item");

items.forEach((item) => {

    const ButtonMais = 
    item.querySelector(".ButtonMais");

    const ButtonMenos = 
    item.querySelector(".ButtonMenos");

    const quantidade = 
    item.querySelector(".quantidade");

    let valor = 0;

    ButtonMais.addEventListener("click", () => {
        valor++;
        console.log("Botao mais clicado!");
        quantidade.innerText = valor;
    });

    ButtonMenos.addEventListener("click", () => {
        if(valor > 0){
            valor--;
            quantidade.innerText = valor;
            console.log("Botao menos clicado!");
        };
    });

});