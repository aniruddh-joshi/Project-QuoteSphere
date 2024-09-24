// Select DOM elements
const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

// Function to fetch the quote using XMLHttpRequest
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            // Parse the JSON response
            const result = JSON.parse(this.responseText);
            // Update the DOM with the fetched quote and author
            quoteText.innerText = result.content;
            authorName.innerText = result.originator.name;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        }
    });

    xhr.open('GET', 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en');
    xhr.setRequestHeader('x-rapidapi-key', '1573c6803dmsh6ba5e963855f821p1a0b21jsnc431c95c7f11');
    xhr.setRequestHeader('x-rapidapi-host', 'quotes15.p.rapidapi.com');

    xhr.send(data);
}

// Text-to-Speech function
speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);

        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

// Copy Quote to Clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
    alert("Quote copied to clipboard!");
});

// Tweet the Quote
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

// Fetch a new quote when the button is clicked
quoteBtn.addEventListener("click", randomQuote);

// Fetch a random quote on page load
window.onload = randomQuote;
