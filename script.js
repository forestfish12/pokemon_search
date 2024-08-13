const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const imgContainer = document.getElementById("img-container");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


let allPokemon = [] 

searchButton.addEventListener("click", searchForPokemon);

async function searchForPokemon() {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    allPokemon = [...data.results]
  } catch (err) {
    console.error(err);
  }
  const searchTerm = searchInput.value.toLowerCase();
  const pokemonRef = allPokemon.find(object => object.name === searchTerm || object.id == searchTerm);
  if (!pokemonRef) {
    alert('Pokemon not found');
    return;
  }

  try {
    const res2 = await fetch( baseUrl + '/' + pokemonRef.id);
    const pokeObj = await res2.json();
    fillElements(pokeObj);
  } catch (err) {
    console.error(err);
  }
}

function fillElements(pokemonObj) {
  const typesHTML = pokemonObj.types.map(typeObj => {
    return `<span class="type ${typeObj.type.name}">${typeObj.type.name}</span>`
  }).join('');

  imgContainer.innerHTML = `<img id="sprite" src="${pokemonObj.sprites.front_default}" />`;
  pokemonName.innerText = pokemonObj.name.toUpperCase() + ' ';
  pokemonId.innerText = '#' + pokemonObj.id;
  weight.innerText = 'Weight: ' + pokemonObj.weight;
  height.innerText = ' Height: ' + pokemonObj.height;
  types.innerHTML = typesHTML; //TODO: Add logic for adding multiple types
  hp.innerText = pokemonObj.stats[0].base_stat;
  attack.innerText = pokemonObj.stats[1].base_stat;
  defense.innerText = pokemonObj.stats[2].base_stat;
  specialAttack.innerText = pokemonObj.stats[3].base_stat;
  specialDefense.innerText = pokemonObj.stats[4].base_stat;
  speed.innerText = pokemonObj.stats[5].base_stat;
}