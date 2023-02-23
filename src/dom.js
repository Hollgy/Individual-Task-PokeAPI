let search_container = document.getElementById("search-container")
let team_container = document.getElementById("team-container")
let reserve_container = document.getElementById("reserve-container")
import { LS_KEY } from "./variables.js"

function toggleTeamPage() {
    const teamPage = document.getElementById('team-pokemon');
    const teamButton = document.getElementById('team-button');
    const searchPage = document.getElementById('searched-pokemon');

    // Set initial display style to 'none'
    teamPage.style.display = 'none';

    teamButton.addEventListener('click', () => {
        if (teamPage.style.display === 'none') {
            // Show team page and hide search page
            teamPage.style.display = 'block';
            searchPage.style.display = 'none';
        } else {
            // Hide team page
            teamPage.style.display = 'none';
        }
    });
}

toggleTeamPage();

function toggleSearchPage() {
    const teamPage = document.getElementById('team-pokemon');
    const searchButton = document.getElementById('search-button');
    const searchPage = document.getElementById('searched-pokemon');

    // Set initial display style to 'none'
    searchPage.style.display = 'none';

    searchButton.addEventListener('click', () => {
        if (searchPage.style.display === 'none') {
            // Show search page and hide team page
            searchPage.style.display = 'block';
            teamPage.style.display = 'none';
        } else {
            // Hide search page
            searchPage.style.display = 'none';
        }
    });
}

toggleSearchPage();




function madePokemon() {

}

// let pokelist = JSON.parse(localStorage.getItem(LS_KEY));

// Retrieves the thumbnail, either from cache or from PokeAPI (which is then cached)
// function get_front_default(pokemon, pokelist) {
// IF the pokemon "front_default" thumbnail exists in cache -> use it
// }

function find_image_for(pokes_slice) {
    for (let pokemon of pokes_slice) {
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

// Skapar element som visar pokemon"kortet"
function add_poke_to_search_result(pokemon, search_container) {
    let pokecard = document.createElement("div");
    pokecard.innerText = pokemon.name;
    pokecard.classList.add("poke-card")

    let poke_img = document.createElement("img");

    let pokebutton = document.createElement("button");
    pokebutton.innerText = "Add To Team"
    pokebutton.classList = "addteam"
    let reservebutton = document.createElement("button");
    reservebutton.innerText = "Add To Reserve"
    reservebutton.classList = "addreserve"

    console.log("Using image: ", pokemon.front_default);
    poke_img.src = pokemon.front_default; //(pokemon, pokelist);

    pokecard.append(poke_img);
    pokecard.append(pokebutton);
    pokecard.append(reservebutton);

    // Event för addering till Team
    pokebutton.addEventListener("click", function () {
        addPokeToTeam(pokemon, team_container, search_container);
    });
     // Event för addering till reserve
    reservebutton.addEventListener("click", function () {
        addPokeToReserve(pokemon, reserve_container, search_container);
    });

    search_container.append(pokecard);
}

//function som adderar pokemon från sökrutan till reserve
function addPokeToReserve(pokemon, reserve_container, search_container) {
    let pokecard = document.createElement("div");
    pokecard.innerText = pokemon.name;
    pokecard.classList.add("poke-card");

    let poke_img = document.createElement("img");
    poke_img.src = pokemon.front_default;

    let kickfromteam = document.createElement("button");
    kickfromteam.innerText = "Kick";
    kickfromteam.classList = "kick"
    kickfromteam.addEventListener("click", function () {
        pokecard.remove();
    });

    pokecard.append(poke_img);
    pokecard.append(kickfromteam);

    reserve_container.append(pokecard);
}

//function som adderar pokemon från sökrutan till reserve
function addPokeToTeam(pokemon, team_container, search_container) {
    const maxTeamSize = 3;
    let teamSize = team_container.children.length;


    // Kollar teamsize och varnar om det överstiger 3
    if (teamSize >= maxTeamSize) {
        let messageElement = document.createElement("p");
        messageElement.innerText = "Team is full";
        messageElement.style.color = "red";
        messageElement.style.fontWeight = "bold";
        messageElement.classList = "Teamfull"
        search_container.append(messageElement);
        return;
    }

    let pokecard = document.createElement("div");
    pokecard.innerText = pokemon.name;
    pokecard.classList.add("poke-card");

    let poke_img = document.createElement("img");
    poke_img.src = pokemon.front_default;

    let kickfromteam = document.createElement("button");
    kickfromteam.innerText = "Kick";
    kickfromteam.classList = "kick"
    kickfromteam.addEventListener("click", function () {
        pokecard.remove();
    });

    pokecard.append(poke_img);
    pokecard.append(kickfromteam);

    team_container.append(pokecard);
}





export { add_poke_to_search_result }
export { find_image_for }