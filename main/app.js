const Container = document.getElementById("search-results");
const Titlecontain = document.getElementById("title");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const Imagecontain = document.getElementById("img")
const Pagetitle = document.getElementById("pgt");

const searchin = () => {
  const searchText = searchInput.value;
  if (searchText.trim() !== "") {
    const url = `/main?${encodeURIComponent(searchText)}`;
    window.location.href = url;
  }
};

const search = window.location.search.substr(1);
const apiurl = `https://anshwadhwa.pythonanywhere.com/api/search/hinduism-${search}`;

const performSearch = () => {
  if (search) { // Check if search variable is not empty
    const cacheKey = `hinduwiki_cache_${search}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { extract, searchtitle, imgrc } = JSON.parse(cachedData);
      Container.textContent = extract;
      Titlecontain.textContent = searchtitle;
      Imagecontain.src = imgrc;
    } else {
      Pagetitle.textContent = `Hinduwiki • ${search}`; // Set the page title
      fetch(apiurl)
        .then(response => response.json())
        .then(response => {
          if (response.error) {
            Container.textContent = response.error;
          } else {
            const { description: extract, title: searchtitle, image_url: imgrc } = response;
            Container.textContent = extract;
            Titlecontain.textContent = searchtitle;
            Imagecontain.src = imgrc;

            // Cache the data
            const dataToCache = { extract, searchtitle, imgrc };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
          }
        })
        .catch(error => {
          Container.textContent = `No Articles Found With The Term '${search}'`;
          Titlecontain.textContent = `An Error Occurred While Searching. Error Code: 2`;
          console.error(error);
        });
    }
  } else {
    Titlecontain.textContent = "Error Code: 1";
    Container.textContent = "Please Specify A Search Term In The URL In This Format: hinduwiki.ml/main?{your search term}";
  }
};

performSearch();

searchButton.addEventListener("click", searchin);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchin();
  }
});
