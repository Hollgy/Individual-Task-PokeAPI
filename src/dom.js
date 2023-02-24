let search_container = document.getElementById("search-container")
let team_container = document.getElementById("team-container")
let reserve_container = document.getElementById("reserve-container")

const searchButton = document.getElementById('search-button');
const teamButton = document.getElementById('team-button');

const searchPage = document.getElementById('searched-pokemon');
const teamPage = document.getElementById('team-pokemon');

function togglePage(page_id) {
    if(page_id === "team") {
        teamPage.style.display = 'block';
        searchPage.style.display = 'none';
    }
    if(page_id === "search") {
        teamPage.style.display = 'none';
        searchPage.style.display = 'block';
    }
}

searchButton.addEventListener("click", () => {togglePage("search")});
teamButton.addEventListener("click", () => {togglePage("team")});

function pokecard_factory(pokemon, card_type) {
    let pokecard = document.createElement("div");
    pokecard.innerText = pokemon.name;
    pokecard.classList.add("poke-card")

    let poke_img = document.createElement("img");
    poke_img.src = pokemon.front_default;
    pokecard.append(poke_img);

    const ability_container = document.createElement("div");

    for(const ability of pokemon.abilities) {
        const ability_div = document.createElement("div");
        ability_div.innerText += ability.ability.name;
        ability_container.appendChild(ability_div);
    }

    pokecard.append(ability_container);

    if(card_type === "search") {
        let pokebutton = document.createElement("button");
        pokebutton.innerText = "Add To Team"
        pokebutton.classList = "addteam"

        let reservebutton = document.createElement("button");
        reservebutton.innerText = "Add To Reserve"
        reservebutton.classList = "addreserve"

        pokecard.append(pokebutton);
        pokecard.append(reservebutton);

        // Event för addering till Team
        pokebutton.addEventListener("click", function () {
            if(team_container.children.length < 3) {
                team_container.append(pokecard_factory(pokemon, "team"));
            }
            else {
                if(pokecard.classList.contains("FullMessage")) { return; }

                let messageElement = document.createElement("p");
                messageElement.innerText = "Team is full";
                messageElement.style.color = "red";
                messageElement.style.fontWeight = "bold";
                messageElement.classList = "Teamfull"
                pokecard.classList.add("FullMessage");
                pokecard.append(messageElement);
            }
        });

        // Event för addering till reserve
        reservebutton.addEventListener("click", function () {
            reserve_container.append(pokecard_factory(pokemon, "reserve"));
        });
    }
    if(card_type === "team" || card_type === "reserve") {
        let kickButton = document.createElement("button");
        kickButton.innerText = "Kick";
        kickButton.classList = "kick"
        kickButton.addEventListener("click", function () {
            pokecard.remove();
        });

        pokecard.append(kickButton);
    }
    if(card_type === "team") {
        let upButton = document.createElement("button");
        upButton.innerText = "Up";
        upButton.classList = "up";
        upButton.addEventListener("click", function() {
            let prevSibling = pokecard.previousElementSibling;
            if (prevSibling !== null) {
                team_container.insertBefore(pokecard, prevSibling);
            }
        });

        let downButton = document.createElement("button");
        downButton.innerText = "Down";
        downButton.classList = "down";
        downButton.addEventListener("click", function() {
            let nextSibling = pokecard.nextElementSibling;
            if (nextSibling !== null) {
                team_container.insertBefore(nextSibling, pokecard);
            }
        });
        pokecard.append(upButton);
        pokecard.append(downButton);
    } 

    return pokecard;
}

// Skapar element som visar pokemon"kortet"
function add_poke_to_search_result(pokemon, search_container) {
    const pokecard = pokecard_factory(pokemon, "search");
    search_container.append(pokecard);
}

export { add_poke_to_search_result }