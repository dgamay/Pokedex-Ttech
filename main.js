const pokemonList = document.getElementById("pokemonList")
const pokemonDetail=document.getElementById("pokemonDetail")
const pokemonInfo= document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
const btnBuscar = document.getElementById("btnBuscar")
const btnBck = document.getElementById("btnBck")
const buscar= document.getElementById("buscar")

/*  FUNCION QUE LLAMA A  LA API */

async function getPokemonData(pokemonID) {
    try {
        let res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon =await res.json()
        console.log(pokemon)
    return pokemon 
        
    } catch (error) {
        console.error(error.message)
        
    }
         
}

/* MUESTRA LAS FOTOS Y/O LOS DATOS QUE SE REQUIERAN DEL POKEMON */
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID:${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail (pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}

function showPokemonDetail(pokemon){
    pokemonList.style.display="none"
    pokemonDetail.style.display="block"
    // Obtener todos los tipos del Pokémon
    let typesName = []
    let typesImg = ""
    for(i=0;i<pokemon.types.length ;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src = "./assets/${pokemon.types[i].type.name}.png" alt= "logo tipo ${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }
    pokemonList.style.display = "none" 
    pokemonDetail.style.display =  "block"
/*     let types = pokemon.types.map(t => t.type.name).join(", ");  // Une los tipos con una coma
 */    pokemonInfo.innerHTML=`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h4> ${typesName}</h4>
    <div> ${typesImg}</div>
    `
}

async function loadPokedex() {
    for (let i = 1; i<=5; i++) {
        let pokemon =await getPokemonData(i)
        displayPokemon(pokemon)  
/*         console.log(pokemon.types[0].type.name)      
 */    }
    
}
//BOTON ATRAS
btnBack.addEventListener("click",()=>{
    pokemonList.style.display="grid"
    pokemonDetail.style.display="none"
})

btnBuscar.addEventListener("click", searchPokemonByName);

async function searchPokemonByName() {
    const inputBuscar = document.getElementById("inputBuscar").value.toLowerCase(); // Convertir a minúsculas para evitar problemas de mayúsculas/minúsculas
    if (!inputBuscar) {
        alert("Por favor, ingresa un nombre de Pokémon.");
        return;
    }
    try {
        const pokemon = await getPokemonData(inputBuscar); // Llamar a la API usando el nombre en lugar del ID
        if (pokemon) {
            pokemonList.innerHTML = ""; // Limpiar la lista de Pokémon
            displayPokemon(pokemon); // Mostrar solo el Pokémon buscado
            //Creacion del boton.#########################
            const btnBck = document.createElement("button");
            btnBck.textContent = "";
            btnBck.id = "btnBck";
            buscar.appendChild(btnBck);

            //##########################################
            //Evento del boton.
            btnBck.addEventListener("click", () => {
                pokemonList.innerHTML = "";
                loadPokedex();
                btnBck.remove();
            });
        }
    } catch (error) {
        alert("No se encontró el Pokémon. Intenta con otro nombre.");
    }
}

loadPokedex()
