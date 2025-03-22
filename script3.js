const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");

const getRandomQuote = async () => {
  try {
    const response = await fetch('quotes_100.json'); 
    const quotes = await response.json(); 

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author || "Unknown"}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};

document.getElementById("new-quote").addEventListener("click", getRandomQuote);

window.onload = getRandomQuote;
