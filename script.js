//LIST OF ALL THE QUOTES FROM THE DB
let apiQuotes = [];

//CURRENT QUOTE SELECTED FROM THE FULL LIST
let currentQuote = {};

//DOM ELEMENTS
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const quote = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote");
const loaderContainer = document.getElementById("loader-container");
const tweetBtn = document.getElementById("x-twitter");

//STARTS THE APP 
getQuotes();

//LISTENNER FOR THE NEW QUOTE BUTTON
newQuoteBtn.addEventListener("click",newQuote);

tweetBtn.addEventListener("click",tweetQuote);


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
    
    toggleLoader("show");

    //HIDE OLD INFO
    quoteText.style.opacity = "0";
    author.style.opacity = "0";

    //GET RANDOM QUOTE
    currentQuote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    toggleLoader("hide");

    //SHOW NEW INFO
    quoteText.style.opacity = "1";
    author.style.opacity = "1";
    
    //IF THE TEXT LENGTH IS TO BIG, WE LOWER THE FONT SIZE
    (currentQuote.text.length > 120) ? quote.classList.add("long-quote") : quote.classList.remove("long-quote");

    //UPDATES THE UI
    quote.innerText = currentQuote.text;
    let authorText = (currentQuote.author != null) ? currentQuote.author : "Unknown author";
    author.innerText = authorText;

}

function toggleLoader(status){
    if(status == "show"){
        loaderContainer.classList.remove("hidden");
    }else{
        loaderContainer.classList.add("hidden");
    }
}

function tweetQuote(){
    let url =`https://twitter.com/intent/tweet?text="${currentQuote.text}"%0D%0A-${currentQuote.author}`;
    

    //VERSION WITH WINDOW.OPEN
    window.open(url,"_blank");

    //VERSION WITH <A> TAG
   /*  let el = document.createElement("a");
    el.href = url;
    el.target = "_blank";
    el.click(); */
}