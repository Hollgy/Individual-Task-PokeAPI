import { add_poke_to_search_result } from "./dom.js";
import { LS_KEY, DEBUG, DEBUG_CLEAR_CACHE, dbg } from "./variables.js"

// Needs to be called before any almost everything else
await build_cache();

// Globals
const search_container = document.getElementById("search-container");
const search_field = document.getElementById("search-input").querySelector("input")
const landingImage = document.querySelector(".landing-image")

// Global object containing the pokemon list, this should be cached on mutation
let pokelist = JSON.parse(localStorage.getItem(LS_KEY));

function clear_search_results() {
    search_container.innerHTML = "";
}

function removeLandingImage() {
    landingImage.style.display = "none"
}
// Gets the image url for the pokemon and adds it to the pokemon object in the hot cache
// Some other routine will need to write cache to localStorage
/**
 * Fetches and sets the image url for the pokemon object in the hot cache
 * @param {Object} pokemon - The pokemon object to add the image url to
 */
async function find_image_for(pokemon) {
    if (pokemon.hasOwnProperty("front_default")) {
        dbg("Using cached image url...");
    }
    else {
        dbg("Fetching non-cached image url...");
        let response = await fetch(pokemon.url);
        if (response.ok) {
            let big_poke = await response.json();
            pokemon.front_default = big_poke.sprites.front_default;
            pokemon.abilities = big_poke.abilities;
            pokemon.type = big_poke.types[0].type.name;
        }
    }
}

// Add the event listener to the search input
search_field.addEventListener("input", async () => {
    let poke_name_string = search_field.value;
    if (poke_name_string.length > 0) { removeLandingImage();  }
    if (poke_name_string.length < 3) { clear_search_results(); return; }
    let poke_result_list = await query_pokes(poke_name_string);

    dbg(`Looking for "${poke_name_string}" in cache which has ${pokelist.results.length} entries. Found ${poke_result_list.length} matches.`);

    clear_search_results();
    for (const pokemon of poke_result_list) {
        // Are we still searching for the same thing?
        if (!(poke_name_string === search_field.value)) {
            dbg("Search is no longer active, aborting...");
            return;
        }
        add_poke_to_search_result(pokemon, search_container);
    }

});

/**
 * Returns a list of objects containing the pokemon's name, url, and image url
 * @param {String} pokemon_searchstr Case-insensitive string to search for
 * @returns List of objects containing the pokemon's name, url, and image url
 */
async function query_pokes(pokemon_searchstr) {
    // Linear search through hot cache
    const found_pokes = pokelist.results.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemon_searchstr.trim().toLowerCase()));

    // found_pokes is a slice into the pokelist array, so we can modify it and it will be reflected in the hot cache
    for (const pokemon of found_pokes) {
        await find_image_for(pokemon);
    }

    // Write cache to localStorage
    localStorage.setItem(LS_KEY, JSON.stringify(pokelist));

    // Returns a shallow copy into the pokelist array, (not a new array, but a slice into pokelist)
    return found_pokes;
}

// Checks cache for pokemon list, if not present, fetches it from the API
// Note that the entries from the api does not contain image urls, do we need a routine to fetch 
// them (and insert them into cache) on demand (when the user searches for a pokemon).
async function build_cache() {
    // Maybe check for a smaller key, like "has_cache", 
    // so that we dont read several megabytes each time we check.
    if (!localStorage.getItem(LS_KEY)) {
        const endp = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
        const response = await fetch(endp);
        if (response.ok) {
            const data = await response.json();
            dbg("Cache non-existent, rebuilding cache");
            localStorage.setItem(LS_KEY, JSON.stringify(data));
        }
    } else {
        dbg("Cache seems present");
    }

    if (DEBUG) {
        let cache = JSON.parse(localStorage.getItem(LS_KEY));
        let poke_amount = cache.results.length;
        let cached_images = cache.results.reduce((acc, pokemon) => (acc += (pokemon.hasOwnProperty("front_default"))), 0);
        console.log(`DEBUG: Cache has ${poke_amount} entries, ${cached_images} of which have cached images`);
    }

    // WARNING
    // Deletes every item in the cache for debugging purposes
    if (DEBUG && DEBUG_CLEAR_CACHE) {
        dbg("DEBUG: WARNING :: Clearing cache :: WARNING");
        localStorage.clear();
    }
}
