//LIST OF ALL THE QUOTES FROM THE DB
let apiQuotes = [];

//CURRENT QUOTE SELECTED FROM THE FULL LIST
let currentQuote = {};

//STARTS THE APP 
getQuotes();

//LISTENNER FOR THE NEW QUOTE BUTTON
document.getElementById("new-quote").addEventListener("click",newQuote);


async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        //GET THE FIRST QUOTE TO SHOW IT WHEN THE SITE LOADS
        newQuote();
    }catch(error){
        alert(error);
    }
}

function newQuote(){
    //GET RANDOM QUOTE
    currentQuote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //UPDATES THE UI
    document.getElementById("quote").innerText = currentQuote.text;
    let author = (currentQuote.author != null) ? currentQuote.author : "Unknown author";
    document.getElementById("author").innerText = author;
}