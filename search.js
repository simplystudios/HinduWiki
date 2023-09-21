const searchButton = document.getElementById("searchbutton");
const searchInput = document.getElementById("searchbar");
const hinduismRelated = [
  "Lord Shiva",
  "Kashi Vishwanath Temple",
  "Ganesha",
  "Siddhivinayak Temple",-
  "Lord Vishnu",
  "Tirupati Balaji Temple",
  "Goddess Lakshmi",
  "Vaishno Devi Temple",
  "Lord Krishna",
  "Iskcon Temple",
  "Goddess Durga",
  "Kolkata Kalighat Temple",
  "Lord Rama",
  "Ayodhya Ram Janmabhoomi Temple",
  "Lord Hanuman",
  "Hanuman Temple, New Delhi",
  "Lord Brahma",
  "Pushkar Brahma Temple",
  "Goddess Saraswati",
  "Saraswati Temple, Basar",
  "Diwali Festival",
  "Holi Festival",
  "Ganesh Chaturthi",
  "Navratri Festival",
  "Aarti",
  "Maha Shivaratri",
  "Pooja",
  "Ganga Aarti",
  "Raksha Bandhan",
  "Yoga and Meditation",
  "Varanasi Ghats",
  "Kumbh Mela"
];

var randomNumber = Math.floor(Math.random()*hinduismRelated.length);

async function performSearch(search){
   if (search.trim() !== "") {
    const url = `https://hinduwiki.vercel.app/main?${encodeURIComponent(search)}`;
    console.log(url)
    window.location.href = url;
  }
};

async function getvalue(){
  const searchText = searchInput.value;
  console.warn(searchText)
  performSearch(searchText);
}

searchButton.addEventListener("click", getvalue() );

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    getvalue()
  }
});

function randomarticle(){
  performSearch(hinduismRelated[randomNumber]);
}