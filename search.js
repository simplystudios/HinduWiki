const searchButton = document.getElementById("searchbutton");
const searchInput = document.getElementById("searchbar");

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
