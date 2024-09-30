const pokemonName=document.querySelector(".pokemon-name");
const pokemonNumber=document.querySelector(".pokemon-number");
const pokemonImage=document.querySelector(".pokemon-image");

const form=document.querySelector(".form");
const inputSearch=document.querySelector(".input-search");

const  btnPrev=document.querySelector(".btn-prev");
const  btnNext=document.querySelector(".btn-next");
const buttons=document.querySelectorAll(".buttons button");

let currentIndex= "1";



/*Estrutura de uma array function */
/*---------USANDO UMA API--------------- */
/* -1 A funcao vai receber um pokemon como paramentro.
   -2 Cria uma segunda variavel para receber a resposta da API, ou seja uma fetch com o link do site da Api;
   -3 O link da API tem que ser em template string, o que permite colocar uma variavel no meio usando os compandos ${}
   -4 No template string vai ir o parametro da const pai  
    obs: o fetch recebe uma promess para isso temos que usar o async await que vai esperar o fetch terminar a funcao dele, */
const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    /*Esse se é pra garantir que a pessoa escreva o nome correto do pokemon, o codigo 200 é um codigo decerto
    que encontrou o pokemon procurado */
    if(APIResponse.status===200){
        const data= await APIResponse.json(); /*Extrai e converte os dados para JSON */
        return data;
    }


}

const renderPokemon = async (pokemon)=>{
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

      /*O Codigo so vai renderizar se o nome digitado for encontrada, então esse se so vai rodar se encontrar o pokemon */
    if(data){    
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        /*Podemos acessar um objeto apenas usando o ponto como fizemos nos dois primeiros casos, e entre parenteses como no caso abaixo. */
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        inputSearch.value="";
    }else{
        pokemonName.innerHTML ="Not Found :c";
        pokemonNumber.innerHTML = "";
    }

}
 /*Adicionar o eventListener ao fomr junto do comando submit para enviar os dados quando os campos estiverem preenchidos
 a seguir o prevcentDefault para nao permitir o envio do formulario se os campos estiverem em branco, e por ultimo
 chamar a funcao renderPokemon com as informacoes escritas no input */
form.addEventListener("submit", (event)=>{
    event.preventDefault(); /*Vai empredir que o formulario seja enviado caso nao tenha dados */
    renderPokemon(inputSearch.value.trim().toLowerCase());
        
})

renderPokemon(currentIndex);



// btnPrev.addEventListener("click", async ()=>{
//     currentIndex--;
//     if(currentIndex < 0){
//         currentIndex=0;
//     }
//     console.log(currentIndex)
//     await renderPokemon(currentIndex);
        
// })

// btnNext.addEventListener("click", async()=>{
//     currentIndex++;
//     console.log(currentIndex)
//     await renderPokemon(currentIndex);
        
// })



buttons.forEach(button => {
    button.addEventListener("click", async (e)=>{
        if(e.target.className=== "btn-next"){
           currentIndex++;                      
           console.log(currentIndex)
        }else if(e.target.className==="btn-prev"){
            currentIndex--;           
        }if(currentIndex<0){
            currentIndex=0;
        }
        await renderPokemon(currentIndex);    
        console.log(currentIndex)     
    })
});
