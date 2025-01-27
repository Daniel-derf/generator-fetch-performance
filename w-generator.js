
function getElement(element) {
    return document.querySelector(element);
}

const searchInput = getElement('#pokemon-input')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function runApp(){
    const generator = getPokemons()

    let done = false;
    let i = 0;

    while(!done){
        const {value, done: isDone} = await generator.next()
        
        if(value){
            addCard(value, i)
            i+=1
        }

        done = isDone
    }
}

const getPokemons = async function*(){
    for (i = 1; i <= 1100; i ++){
        yield await getPokeInfo(baseUrl+i)
    }
}

async function getPokeInfo(url) {
    return await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
}

function addCard(pokemon, index) {
    const pokemonCard = getElement('#pokemons-container');

    if (index === 0) pokemonCard.innerHTML = '';

    let pokemonAdd =
    `<article class="container-card" id="${index}">
        <h2 class="card-title">${pokemon.name}</h2> 
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png"> 
        <div>
            <h4>Pokemon Type: ${pokemon.types[0].type.name}</h4>
            <h4>Pokemon Number: ${index + 1}</h4>
        </div>
    </article>`;
    pokemonCard.innerHTML += pokemonAdd;
    index++;

} 

runApp()











