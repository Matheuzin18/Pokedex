//consts

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form =  document.querySelector('.form');
const input =  document.querySelector('.input_search');
const buttonPrev =  document.querySelector('.btn-prev');
const buttonNext =  document.querySelector('.btn-next');
const shinyButton = document.querySelector('.shiny-button');
const shinyButton2 = document.querySelector('.shiny-button2');

//começar pelo pokemon 1

let searchPokemon = 1;

//pegar informarções na API

const fetchPokemon = async (pokemon) => {
   const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
 
   if (APIResponse.status === 200) {
   const data = await APIResponse.json();
   return data; 
  }
}

//carregar informações do pokemon

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML ='';

   const data = await fetchPokemon(pokemon);

   if (data) {
       pokemonImage.style.display = 'block';
       pokemonName.innerHTML = data.name;
       pokemonNumber.innerHTML = data.id;
       pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
       input.value = '';
       searchPokemon = data.id;
    } 
//não encontrado
     else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonNumber.innerHTML = '';
        };

//transformar em shiny
shinyButton.addEventListener('click', () => {
    if (data) {
     pokemonImage.style.display = 'block';
     pokemonName.innerHTML = data.name;
     pokemonNumber.innerHTML = data.id;
     pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
     input.value = '';
     searchPokemon = data.id;
     shinyButton.setAttribute('id', 'hide');
     shinyButton2.removeAttribute('id','hide');
  } 
//não encontrado
  else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Não encontrado!';
      pokemonNumber.innerHTML = '';
    }
});

//destransformar em shiny
shinyButton2.addEventListener('click', () => {
    if (data) {
     pokemonImage.style.display = 'block';
     pokemonName.innerHTML = data.name;
     pokemonNumber.innerHTML = data.id;
     pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
     input.value = '';
     searchPokemon = data.id;
     shinyButton2.setAttribute('id', 'hide');
     shinyButton.removeAttribute('id','hide');
  } 
//não encontrado
  else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Não encontrado!';
      pokemonNumber.innerHTML = '';
    }
});
};

//não recarregar a página

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

//Pokemon anterior

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        shinyButton2.setAttribute('id', 'hide');
        shinyButton.removeAttribute('id','hide');
    }
});

//proximo Pokemon

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    shinyButton2.setAttribute('id', 'hide');
    shinyButton.removeAttribute('id','hide');
   });

//carregar Pokemon
  
renderPokemon(searchPokemon);