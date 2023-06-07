const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const performSearch = () => {
  const searchText = searchInput.value;
  if (searchText.trim() !== "") {
    const url = `/main?${encodeURIComponent(searchText)}`;
    window.location.href = url;
  }
};

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  }
});
donateButton.addEventListener('click', function() {
    // Event handler code
    // ...
    // Perform actions to support the developer
    // For example, open a new tab with a donation page
    window.open('https://www.buymeacoffee.com/anshwadhwa8', '_blank');
});