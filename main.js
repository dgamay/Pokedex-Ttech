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

  async function loadStats(pokemonId) {
    let pokemonStats = await getPokemonData(pokemonId);
    if (!pokemonStats || !pokemonStats.stats) {
      return {}; // Devuelve un objeto vacío si no hay estadísticas
    }
    const stats = {};
    for (let i = 0; i < pokemonStats.stats.length; i++) {
      stats[pokemonStats.stats[i].stat.name] = pokemonStats.stats[i].base_stat;
    }
    return stats;
  }

//BOTON ATRAS
btnBack.addEventListener("click", () => {
  pokemonList.style.display = "grid";
  pokemonDetail.style.display = "none";
});

//############################ BOTON BUSCAR ##################################
btnBuscar.addEventListener("click", searchPokemonByName);

async function searchPokemonByName() {
  // Define una función asíncrona llamada searchPokemonByName.
  const inputBuscar = document.getElementById("inputBuscar").value.toLowerCase();
  // Obtiene el valor del elemento con el id "inputBuscar", lo convierte a minúsculas y lo almacena en inputBuscar.
  if (!inputBuscar) {
    // Verifica si inputBuscar está vacío (no se ingresó ningún nombre).
    alert("Por favor, ingresa un nombre de Pokémon.");
    // Muestra una alerta pidiendo al usuario que ingrese un nombre.
    return;
    // Sale de la función si no se ingresó un nombre.
  }
  try {
    // Inicia un bloque try...catch para manejar posibles errores.
    const pokemon = await getPokemonData(inputBuscar);
    // Llama a la función getPokemonData con el nombre del Pokémon y espera el resultado.
    if (pokemon) {
      // Verifica si se encontró el Pokémon (si pokemon no es null o undefined).
      pokemonList.innerHTML = "";
      // Limpia el contenido del elemento con el id "pokemonList".
      displayPokemon(pokemon);
      // Llama a la función displayPokemon para mostrar los datos básicos del Pokémon.
      const stats = await loadStats(pokemon.id);
      // Llama a la función loadStats para obtener las estadísticas del Pokémon y espera el resultado.
      // Agregar las estadísticas al pokemonCard.
      const statsHTML = Object.entries(stats)
        // Convierte el objeto stats en una matriz de pares clave-valor y luego mapea cada par a una cadena HTML.
        .map(([nombre, valor]) => `<p>${nombre}: ${valor}</p>`)
        // Une todas las cadenas HTML en una sola cadena.
        .join("");
      pokemonCard.innerHTML += statsHTML;
      // Agrega la cadena statsHTML al contenido HTML del elemento pokemonCard.
      const btnBck = document.createElement("button");
      // Crea un nuevo elemento botón.
      btnBck.textContent = "";
      // Establece el texto del botón como vacío.
      btnBck.id = "btnBck";
      // Establece el id del botón como "btnBck".
      buscar.appendChild(btnBck);
      // Agrega el botón como hijo del elemento "buscar".
      btnBck.addEventListener("click", () => {
        // Agrega un event listener al botón para el evento click.
        pokemonList.innerHTML = "";
        // Limpia el contenido del elemento pokemonList.
        loadPokedex();
        // Llama a la función loadPokedex para cargar la lista original de Pokémon.
        btnBck.remove();
        // Remueve el botón del DOM.
      });
    }
  } catch (error) {
    // Captura cualquier error que ocurra dentro del bloque try.
    alert("No se encontró el Pokémon. Intenta con otro nombre.");
    // Muestra una alerta indicando que no se encontró el Pokémon.
  }
}

function displayPokemon(pokemon) {
  pokemonCard = document.createElement("div"); //crea u div dinmico
  pokemonCard.classList.add("pokemon-card"); // agrega la case l div creado
  pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID:${pokemon.id}
    `;
  pokemonList.appendChild(pokemonCard);
}
loadPokedex();
loadStats();
