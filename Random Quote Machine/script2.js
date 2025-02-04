// Simple quote generator only from users own library or array

const quotes = [
  {text: "To listen well is as powerful a means of communication and influence as to talk well.", author: "John Marshall"},
  {text: "Wisdom consists of the anticipation of consequences.", author: "Norman Cousins"},
  {text: "People may doubt what you say, but they will believe what you do.", author: "Lewis Cass"}
]

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex]
  return randomQuote;
}

const displayQuote = () => {
  const quote = getRandomQuote();
  
  document.getElementById("text").textContent = `"${quote.text}"`
  document.getElementById("author").textContent = `- ${quote.author}`
  
}

document.getElementById("new-quote").addEventListener("click", displayQuote)

window.onload = displayQuote;
