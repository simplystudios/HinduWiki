async function fetchData() {
    const shlok = document.getElementById('shloksans');
    const url = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18';
    const min = 1; // Minimum value (inclusive)
    const max = 18; // Maximum value (exclusive)
    const randomInt = Math.floor(Math.random() * (max - min)) + min;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f2d128400msh4d815e50fe3353bp189216jsnb088839e7b40',
            'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        // Assuming the API response contains an array of chapters
        const chapter = result[randomInt];
        const chapterNumber = chapter.chapter_summary;
        shlok.textContent = `${chapterNumber}`;
    } catch (error) {
        console.error(error);
    }
}

fetchData(); // Call the async function
