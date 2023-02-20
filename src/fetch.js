const searchInput = document.getElementById('search-input').querySelector('input');
const searchButton = document.getElementById('search-name-button');

searchButton.addEventListener('click', function (event) {
    const pokemonName = searchInput.value.trim().toLowerCase();
    
    if (pokemonName.length > 0) {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=386`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const matchingPokemon = data.results.filter(pokemon => {
                    return pokemon.name.includes(pokemonName);
                });
                // Letar matchande bokstäver i namn
                console.log(matchingPokemon);
            })
            .catch(error => {
                console.error(`Fetch error: ${error}`);
            });
    }
});

