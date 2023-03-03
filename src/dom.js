let search_container = document.getElementById("search-container")
let team_container = document.getElementById("team-container")
let reserve_container = document.getElementById("reserve-container")

const searchButton = document.getElementById('search-button');
const teamButton = document.getElementById('team-button');

const searchPage = document.getElementById('searched-pokemon');
const teamPage = document.getElementById('team-pokemon');

function togglePage(page_id) {
    if (page_id === "team") {
        teamPage.style.display = 'block';
        searchPage.style.display = 'none';
    }
    if (page_id === "search") {
        teamPage.style.display = 'none';
        searchPage.style.display = 'block';
    }
}

searchButton.addEventListener("click", () => { togglePage("search") });
teamButton.addEventListener("click", () => { togglePage("team") });

function pokecard_factory(pokemon, card_type, in_reserve = false) {
    let pokecard = document.createElement("div");

    let pokename = document.createElement("div");
    pokename.innerText = pokemon.name;
    pokecard.append(pokename);
    // pokecard.innerText = pokemon.name;

    pokecard.classList.add("poke-card")

    let poke_img = document.createElement("img");
    poke_img.src = pokemon.front_default;
    pokecard.append(poke_img);

    const ability_container = document.createElement("div");
    ability_container.innerText = "Abilites:"
    for (const ability of pokemon.abilities) {
        const ability_div = document.createElement("div");
        ability_div.innerText += ability.ability.name + '.';
        ability_div.classList = "ability-div"
        ability_container.appendChild(ability_div);
    }

    pokecard.append(ability_container);

    if (card_type === "search" || card_type === "reserve") {
        let pokebutton = document.createElement("button");
        pokebutton.innerText = "Add To Team"
        pokebutton.classList = "addteam"

        pokecard.append(pokebutton);

        // Event för addering till Team
        pokebutton.addEventListener("click", function () {
            if (team_container.children.length < 3) {
                team_container.append(pokecard_factory(pokemon, "team"));

                // Remove from reserve container if in there
                if (in_reserve) {
                    pokecard.remove();
                }
            }
            else {
                if (pokecard.classList.contains("FullMessage")) { return; }

                let messageElement = document.createElement("p");
                messageElement.innerText = "Team is full";
                messageElement.classList = "Teamfull"
                pokecard.classList.add("FullMessage");
                pokecard.append(messageElement);

                // Timer för "Team Full i ms"
                setTimeout(function () {
                    pokecard.classList.remove("FullMessage");
                    messageElement.remove();
                }, 1000);
            }
        });

    }

    if (card_type === "search") {
        let reservebutton = document.createElement("button");
        reservebutton.innerText = "Add To Reserve"
        reservebutton.classList = "addreserve"

        pokecard.append(reservebutton);

        // Event för addering till reserve
        reservebutton.addEventListener("click", function () {
            reserve_container.append(pokecard_factory(pokemon, "reserve", true));
        });
    }

    if (card_type === "team" || card_type === "reserve") {
        let kickButton = document.createElement("button");
        kickButton.innerText = "Kick";
        kickButton.classList = "kick"
        kickButton.addEventListener("click", function () {
            pokecard.remove();
        });

        pokecard.append(kickButton);
    }

    if (card_type === "team") {
        // create parent div for buttons
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList = "buttons-container";
        
        // create up button
        let upButton = document.createElement("button");
        upButton.classList = "up";
        upButton.addEventListener("click", function () {
            let prevSibling = pokecard.previousElementSibling;
            if (prevSibling !== null) {
                team_container.insertBefore(pokecard, prevSibling);
            }
        });
      
        // create down button
        let downButton = document.createElement("button");
        downButton.classList = "down";
        downButton.addEventListener("click", function () {
            let nextSibling = pokecard.nextElementSibling;
            if (nextSibling !== null) {
                team_container.insertBefore(nextSibling, pokecard);
            }
        });
      
        // append buttons to the parent div
        buttonsDiv.appendChild(upButton);
        buttonsDiv.appendChild(downButton);
      
        // append parent div to the pokecard element
        pokecard.appendChild(buttonsDiv);
      
        // create rename input and button
        let renameInput = document.createElement("input");
        renameInput.type = "text";
        renameInput.classList = "rename-input";
        renameInput.maxLength = 12
      
        let renameSubmit = document.createElement("button");
        renameSubmit.classList = "renameButton";
        renameSubmit.innerText = "Rename";
        renameSubmit.addEventListener("click", () => {
            if (renameInput.value != "") {
                pokename.innerText = renameInput.value;
            }
            renameInput.value = "";
        });
      
        // append rename input and button to the pokecard element
        pokecard.append(renameInput);
        pokecard.append(renameSubmit);
      }
      



    return pokecard;
}



// Skapar element som visar pokemon"kortet"
function add_poke_to_search_result(pokemon, search_container) {
    const pokecard = pokecard_factory(pokemon, "search");
    search_container.append(pokecard);
}


export { add_poke_to_search_result }