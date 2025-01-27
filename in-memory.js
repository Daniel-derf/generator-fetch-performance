var pokemonData = []

async function runApp(){
    for (i = 1; i <= 1200; i ++){
        pokemonData.push(await getPokeInfo(baseUrl+i)) 
    }
   
    addCards(pokemonData)
    console.log(pokemonData)
}

function getElement(element) {
    return document.querySelector(element);
}
const searchInput = getElement('#pokemon-input')
searchInput.addEventListener('input', (input)=>{
    addCards(pokemonData, input.target.value)
})

function addCards(pokemonData, searchName = '') {
    const pokemonCard = getElement('#pokemons-container');
    let filteredIndex = 0;
    pokemonCard.innerHTML = '';
    pokemonData.forEach((pokemon, index) => {
        console.log(pokemon)
        if (pokemon.name.startsWith(searchName)) {
            let pokemonAdd =
            `<article class="container-card" id="${filteredIndex}">
                <h2 class="card-title">${pokemon.name}</h2> 
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png"> 
                <div>
                    <h4>Pokemon Type: ${pokemon.types[0].type.name}</h4>
                    <h4>Pokemon Number: ${index + 1}</h4>
                </div>
            </article>`;
            pokemonCard.innerHTML += pokemonAdd;
            filteredIndex++;
        } else {
            const element = document.getElementById(filteredIndex);
            if (element) element.remove();
        }
    });
} 

async function getPokeInfo(url) {
    return await fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
}

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';




(
    async () =>{
        await runApp()
    }
)()





