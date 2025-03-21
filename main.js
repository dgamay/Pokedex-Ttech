const pokemonList = document.getElementById("pokemonList")

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

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID:${pokemon.id}</p>
    `
    pokemonList.appendChild(pokemonCard)
}

async function loadPokedex() {
    for (let i = 1; i<=150; i++) {
        let pokemon =await getPokemonData(i)
        displayPokemon(pokemon)        
    }
    
}
loadPokedex()
