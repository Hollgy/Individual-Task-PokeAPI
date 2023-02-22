let searchContainer = document.getElementById("search-container")
import {LS_KEY} from "./variables.js"

function toggleTeamPage() {
    const teamPage = document.getElementById('team-page');
    const teamButton = document.getElementById('team-button');

    teamButton.addEventListener('click', () => {
        if (teamPage.style.display === 'none') {
            teamPage.style.display = 'block';
        } else {
            teamPage.style.display = 'none';
        }
    });
}
toggleTeamPage();


function madePokemon(){
    
}

// let pokelist = JSON.parse(localStorage.getItem(LS_KEY));

// Retrieves the thumbnail, either from cache or from PokeAPI (which is then cached)
// function get_front_default(pokemon, pokelist) {
    // IF the pokemon "front_default" thumbnail exists in cache -> use it
// }

function find_image_for(pokes_slice) {
    for(let pokemon of pokes_slice) {
        if (pokemon.hasOwnProperty("front_default")) {
            console.log("Using cached image url...");
            // return pokemon.front_default;
            // console.log("Retrieved cached: ", pokemon.front_default);
        } else {
            console.log("Fetching non-cached image url...");
            fetch(pokemon.url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // console.log(data.sprites.front_default);
                    // console.log("Writing to image cache2...");
                    pokemon.front_default = data.sprites.front_default;
                    // poke_img.src = data.sprites.front_default;
                    console.log("Fetched: ", data.sprites.front_default);
                })
                .catch((error) => {
                    console.error(error);
                });
            // console.log("pokelist: ", pokelist);
            // return pokemon.front_default;
        }   
    }
}

function add_poke_to_search_result(pokemon, search_container) {
    // let pokeContainer = document.createElement("div")

    let pokecard = document.createElement("div");
    pokecard.innerText = pokemon.name;
    pokecard.classList.add("poke-card")

    let poke_img = document.createElement("img");

    let pokebutton = document.createElement("button");
    pokebutton.innerText  = "Add To Team"

    console.log("Using image: ", pokemon.front_default);
    poke_img.src = pokemon.front_default; //(pokemon, pokelist);

    pokecard.appendChild(poke_img);
    // pokecard.appendChild(pokeContainer);
    pokecard.appendChild(pokebutton);

    search_container.appendChild(pokecard);
}



export { add_poke_to_search_result}
export { find_image_for }