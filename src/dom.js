function toggleSearchPage() {
    const searchPage = document.getElementById('search-page');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        searchPage.classList.toggle('hidden');
    });
}
function toggleTeamPage() {
    const teamPage = document.getElementById('team-page');
    const teamButton = document.getElementById('team-button');

    teamButton.addEventListener('click', () => {
        teamPage.classList.toggle('hidden');
    });
}
toggleSearchPage();
toggleTeamPage();