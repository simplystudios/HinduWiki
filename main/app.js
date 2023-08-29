const Container = document.getElementById("search-results");
const Titlecontain = document.getElementById("title");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const Imagecontain = document.getElementById("img")
const Pagetitle = document.getElementById("pgt");
const pagett = document.getElementById("pgtt");
const Ogdesc = document.getElementById("desc")
const Background = document.getElementById("result")
const Moji = document.getElementById("emoji")
const Mojitxt = document.getElementById("twe")

const searchin = () => {
  const searchText = searchInput.value;
  if (searchText.trim() !== "") {
    const url = `?${encodeURIComponent(searchText)}`;
    window.location.href = url;
  }
};



const search = window.location.search.substr(1);
const apiurl = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=hinduism%20${search}&limit=5`;
let Descriptionex;
let Titleex
let Imageex
const performSearch = (api) => {
  if (search) { // Check if search variable is not empty
    const cacheKey = `hinduwiki_cachedata_${search}_${Date.now}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { excerpt, title, thumbnail } = JSON.parse(cachedData).pages[0];
      const sanitizedExcerpt = excerpt.replace(/<\/?span[^>]*>/g, ""); // Remove <span> tags from excerpt
      const firstThumbnail = thumbnail.url.replace(/\/\d+px-/g, "/1200px-"); // Update thumbnail quality to 200px // Get the first thumbnail URL
      Container.textContent = sanitizedExcerpt;
      document.body.style.backgroundImage = `url('${firstThumbnail}')`;
      Titlecontain.textContent = title;
      Ogdesc.textContent = sanitizedExcerpt;
      Descriptionex = sanitizedExcerpt;
      Titleex = title;
      Imageex = thumbnail.url;
    } else {
      fetch(api)
        .then(response => response.json())
        .then(response => {
          if (response.error) {
            Container.textContent = response.error;
            Ogdesc.textContent = response.error;
          } else {
            const page = () =>{
              if (response.includes(search)){
                page = '1'
              }
            }
            const { excerpt, title, thumbnail } = response.pages[0];
            const sanitizedExcerpt = excerpt.replace(/<\/?span[^>]*>/g, ""); // Remove <span> tags from excerpt
            const firstThumbnail = thumbnail.url.replace(/\/\d+px-/g, "/800px-"); // Update thumbnail quality to 200px // Get the first thumbnail URL
            Container.textContent = sanitizedExcerpt;
            Titlecontain.textContent = title;
            pagett.textContent = `Hinduwiki • ${title}`; // Set the page title
            Pagetitle.textContent = `Hinduwiki • ${title}`; // Set the page title
            document.body.style.backgroundImage = `url('${firstThumbnail}')`;
            Ogdesc.textContent = sanitizedExcerpt;
            Descriptionex = sanitizedExcerpt;
            Titleex = title;
            Imageex = thumbnail.url;


            // Cache the data
            const dataToCache = { pages: [{ excerpt: sanitizedExcerpt, title, thumbnail }] };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
          }
        })
        .catch(error => {
          Ogdesc.textContent = `No Articles Found With The Term '${search}'`;
          Container.textContent = `No Articles Found With The Term '${search}'`;
          Titlecontain.textContent = `An Error Occurred While Searching. Error Code: 2`;
          Mojitxt.innerHTML = `<i id="emoji" class="fa fa-dice"></i> Random Article`;
          // Mojitxt.onclick = performSearch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=hinduism%20bhagwat-gita&limit=5`);;
          
        });
    }
  } else {
    Titlecontain.textContent = "Error Code: 1";
    Container.textContent = "Please Specify A Search Term In The URL In This Format: hinduwiki.ml/main?{your search term}";
    Ogdesc.textContent = "Please Specify A Search Term In The URL In This Format: hinduwiki.ml/main?{your search term}";
    Mojitxt.innerHTML = `<i id="emoji" class="fa fa-dice"></i>  Random Article`;
          // Mojitxt.onclick = performSearch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=hinduism%20bhagwat-gita&limit=5`);;
          
  }
};



performSearch(apiurl);

searchButton.addEventListener("click", searchin);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchin();
  }
});
function tweetf(){
  var tweetText = `Today I found out about \n\n"${Titleex} : ${Descriptionex}"\nusing @hinduwiki\n https://hinduwiki.vercel.app/main?${search}`

  // Construct the tweet URL
  var tweetURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

  // Open the tweet URL in a new window
  window.open(tweetURL);
}

