
const baseURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=52d1c7f&t=';

const movieNames = ['War', 'Kabir Singh', 'Uri: The Surgical Strike', 'Bharat', 
'Mission Mangal', 'Housefull 4','Good Newwz', 'Gully Boy', 'Total Dhamaal', 
'Action', 'The Accidental Prime Minister', 'Why Cheat India', 'Rangeela Raja',
'Thackeray', 'Manikarnika: The Queen of Jhansi', 'Ek Ladki Ko Dekha Toh Aisa Laga', 
'Dosti Ke Side Effects', 'Amavas', 'Hum Chaar', 'Luka Chuppi','Sonchiriya', 
'Badla', 'Milan Talkies','Mere Pyare Prime Minister',
'Kesari', 'Mard Ko Dard Nahi Hota','Ram Ki Janmbhoomi', 
'Notebook','Junglee', 'Petta', 'Kala', 'Ek Tha Tiger','Super 30', 
'Romeo Akbar Walter', 'The Tashkent Files', 'Kalank', 
'Student of the Year 2', 'De De Pyaar De', "India's Most Wanted", 
'PM Narendra Modi', 'Yeh Hai India', 'Horror', 'Article 15'];

const movieInfo = [{Title: 'BestMovie', Year: '2022'}];

for (let i=0; i<movieNames.length; i++) {
    const urlToFetch = `${baseURL}${movieNames[i]}`;

    const movieWebApiFn = async () => {
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                // const jsonResponse = await response.json();
                const jsonString = await response.text();
                const jsonResponse = JSON.parse(jsonString);
                return jsonResponse;
            } 
        } catch(error) {
                throw error;
            }
    }

    function onFulfilled (resolved) {
        const movie = resolved;
        try {
            if (movie.Title && movie.Year) {
                let aMovie = {};
                aMovie.Title = movie.Title;
                aMovie.Year = movie.Year;
                movieInfo.push(aMovie);
            } 
        } catch (error) {
            console.log(error);
        }
    }

    function onRejected (error) {
        console.log(error);
    }

    movieWebApiFn().then(onFulfilled, onRejected);
}

function generateTableBody(table) {
    for (let i=0; i < movieNames.length; i++) {
        let row = `<tr>
        <td>${movieInfo[i].Title}</td>
        <td>${movieInfo[i].Year}</td>
        </tr>`;
        table.innerHTML += row;
    }
}

console.log(movieInfo);
//The above moveInfo seems to have all the objects
//However, the following console.log doesn't get displayed?  Why??
console.log(movieInfo[10].Year);

//Also, only the first object from the array is displayed.
function init() {
    const table = document.getElementById('moviesBody');
    generateTableBody(table);
}