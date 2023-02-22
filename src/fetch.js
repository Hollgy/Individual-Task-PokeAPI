import { add_poke_to_search_result, find_image_for } from "./dom.js";
let searchContainer = document.getElementById("search-container")
import {LS_KEY} from "./variables.js"

const searchInput = document
    .getElementById("search-input")
    .querySelector("input");
const searchButton = document.getElementById("search-name-button");
const search_container = document.getElementById("search-container");

function clear_search_results() {
    search_container.innerHTML = "";
}

build_cache();
let pokelist = JSON.parse(localStorage.getItem(LS_KEY));
searchInput.addEventListener("input", function (event) {
    // If query has been run in the last n milliseconds -> return (exit function)
    // if(timer.reset() < 300) {
    //     return;
    // }

    const pokemon_name = searchInput.value.trim().toLowerCase();

    // If search box is empty
    if(pokemon_name.length === 0) clear_search_results();

    // Do not query unless at least three letters are put into the search
    if (pokemon_name.length >= 3 && pokelist.hasOwnProperty("results")) {

        // matching_pokes is a list containing every pokemon that matches our search
        let matching_pokes = pokelist.results.filter((entry) =>
            entry.name.includes(pokemon_name)
        );

        // Dont clear the search results 
        if(matching_pokes.length > 0) {
            clear_search_results();
        }

        find_image_for(matching_pokes);
        localStorage.setItem(LS_KEY, JSON.stringify(pokelist));

        let matching_pokes2 = pokelist.results.filter((entry) =>
            entry.name.includes(pokemon_name)
        );

        for (let pokemon of matching_pokes2) {
            console.log(pokemon);
            add_poke_to_search_result(pokemon, search_container);
        }
    }
});

function build_cache() {
    if (!localStorage.getItem(LS_KEY)) {
        const endp = "https://pokeapi.co/api/v2/pokemon/?limit=389";
        fetch(endp)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`Error ${resp.status}`);
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Cache non-existent, rebuilding cache");
                localStorage.setItem(LS_KEY, JSON.stringify(data));
            })
            .catch((error) => {
                console.error(`Fetch error: ${error}`);
            });
    } else {
        console.log("Cache seems present");
    }
    // localStorage.removeItem("pokemon"); // TODO: DELETE THIS LINE
}

