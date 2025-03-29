const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo");
const btnBack = document.getElementById("btnBack");
const btnBuscar = document.getElementById("btnBuscar");
const btnBck = document.getElementById("btnBck");
const buscar = document.getElementById("buscar");

/*  FUNCION QUE LLAMA A  LA API */

async function getPokemonData(pokemonID) {
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    let pokemon = await res.json();
    /*         console.log(pokemon.stats[0].stat.name)
     */ return pokemon;
  } catch (error) {
    console.error(error.message);
  }
}

/* MUESTRA LAS FOTOS Y/O LOS DATOS QUE SE REQUIERAN DEL POKEMON */
function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("div"); //crea u div dinmico
  pokemonCard.classList.add("pokemon-card"); // agrega la case l div creado
  pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID:${pokemon.id}
    <table display: none;>
    <tbody>
    </tbody>
  </table></p>
    `;
  pokemonCard.addEventListener("click", () => showPokemonDetail(pokemon));
  pokemonList.appendChild(pokemonCard); // añade la tarjeta a la lista de pokemon
  return true;
}

function showPokemonDetail(pokemon) {
  pokemonList.style.display = "none"; // 1. Ocultar la lista de Pokémon
  pokemonDetail.style.display = "block"; // 2. Mostrar el detalle del Pokémon
  // Obtener todos los tipos del Pokémon, Inicializar variables para los tipos del Pokémon
  let typesName = [];
  let typesImg = "";
  for (i = 0; i < pokemon.types.length; i++) {
    //Iterar sobre los tipos del Pokémon
    console.log(pokemon.types[i].type.name); //Mostrar el nombre del tipo en la consola (para depuración)
    typesImg =
      typesImg +
      `<img src = "./assets/${pokemon.types[i].type.name}.png" alt= "logo tipo ${pokemon.types[i].type.name}">`; //Construir el HTML de la imagen del tipo
    typesName.push(pokemon.types[i].type.name); //Agregar el nombre del tipo al array typesName
  }
  //Actualizar el contenido HTML del detalle del Pokémon
  pokemonInfo.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h4> ${typesName}</h4>
    <div> ${typesImg}</div>
    `;
}

async function loadPokedex() {
  for (let i = 1; i <= 3; i++) {
    let pokemon = await getPokemonData(i);
    displayPokemon(pokemon);
    /*         console.log(pokemon.types[0].type.name)
     */
  }
}

async function loadStats() {
  for (let i = 1; i <= 6; i++) {
    let pokemonStats = await getPokemonData(i);
    let estadistica = pokemonStats.stats[i - 1].stat.name;
    let valor_estadistica = pokemonStats.stats[i - 1].base_stat;
    console.log(estadistica + " = " + valor_estadistica);

    /*         console.log(pokemon.types[0].type.name)
     */
  }
}

//BOTON ATRAS
btnBack.addEventListener("click", () => {
  pokemonList.style.display = "grid";
  pokemonDetail.style.display = "none";
});

//############################ BOTON BUSCAR ##################################
btnBuscar.addEventListener("click", searchPokemonByName);

async function searchPokemonByName() {
  const inputBuscar = document
    .getElementById("inputBuscar")
    .value.toLowerCase(); // Convertir a minúsculas para evitar problemas de mayúsculas/minúsculas
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

loadPokedex();
loadStats();
