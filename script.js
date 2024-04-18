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
    
    loader("show");

    //HIDE OLD INFO
    document.getElementById("quote-text").style.opacity = "0";
    document.getElementById("author").style.opacity = "0";

    //GET RANDOM QUOTE
    currentQuote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    loader("hide");

    //SHOW NEW INFO
    document.getElementById("quote-text").style.opacity = "1";
    document.getElementById("author").style.opacity = "1";
    
    //UPDATES THE UI
    document.getElementById("quote").innerText = currentQuote.text;
    let author = (currentQuote.author != null) ? currentQuote.author : "Unknown author";
    document.getElementById("author").innerText = author;

}

function loader(status){
    if(status == "show"){
        document.getElementById("loader-container").classList.remove("hidden");
    }else{
        document.getElementById("loader-container").classList.add("hidden");
    }
}