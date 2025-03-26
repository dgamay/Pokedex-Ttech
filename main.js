const pokemonList = document.getElementById("pokemonList")
const pokemonDetail=document.getElementById("pokemonDetail")
const pokemonInfo= document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")


/*  FUNCION QUE LLAMA A  LA API */

async function getPokemonData(pokemonID) {
    try {
        let res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon =await res.json()
/*         console.log(pokemon)
 */    return pokemon 
        
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
    let types = pokemon.types.map(t => t.type.name).join(", ");  // Une los tipos con una coma

    pokemonInfo.innerHTML=`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h4>Type: ${types}</h4>
    `
}

async function loadPokedex() {
    for (let i = 1; i<=5; i++) {
        let pokemon =await getPokemonData(i)
        displayPokemon(pokemon)  
        console.log(pokemon.types[0].type.name)      
    }
    
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.display="grid"
    pokemonDetail.style.display="none"
})
loadPokedex()
