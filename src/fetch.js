const LS_KEY = "pokemon";
const searchInput = document
    .getElementById("search-input")
    .querySelector("input");
const searchButton = document.getElementById("search-name-button");

let pokelist = JSON.parse(localStorage.getItem(LS_KEY));
searchButton.addEventListener("click", function (event) {
    build_cache();

    const pokemon_name = searchInput.value.trim().toLowerCase();

    if (pokemon_name.length > 0 && pokelist.results.length > 0) {
        let poke = pokelist.results.filter((entry) =>
            entry.name.includes(pokemon_name)
        );

        let search_container = document.getElementById("search-container");
            search_container.innerHTML = "";

        for (let pokemon of poke) {
            let pokediv = document.createElement("div");
            let poke_img = document.createElement("img");
            pokediv.innerText = pokemon.name;

            if (pokemon.hasOwnProperty("front_default")) {
                console.log("Using cached image url...");
                poke_img.src = pokemon.front_default;
                console.log("Cached: ", pokemon.front_default);
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
                        console.log("Writing to image cache...");
                        pokemon.front_default = data.sprites.front_default;
                        poke_img.src = data.sprites.front_default;
                        console.log("Fetched: ", data.sprites.front_default);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                localStorage.setItem(LS_KEY, JSON.stringify(pokelist));
            }   
            search_container.appendChild(pokediv);
            search_container.appendChild(poke_img);
        }
    }
});

function build_cache() {
    if (!localStorage.getItem(LS_KEY)) {
        const endp = "https://pokeapi.co/api/v2/pokemon/?limit=9";
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
