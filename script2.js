// Simple quote generator only from users own library or array

const quotes = [
  {text: "To listen well is as powerful a means of communication and influence as to talk well.", author: "John Marshall"},
  {text: "Wisdom consists of the anticipation of consequences.", author: "Norman Cousins"},
  {text: "People may doubt what you say, but they will believe what you do.", author: "Lewis Cass"},
   {
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  },
  {
    "text": "Success is not the key to happiness. Happiness is the key to success.",
    "author": "Albert Schweitzer"
  },
  {
    "text": "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "author": "Martin Luther King Jr."
  },
  {
    "text": "Be the change that you wish to see in the world.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "Life is 10% what happens to us and 90% how we react to it.",
    "author": "Charles R. Swindoll"
  },
  {
    "text": "You must be the change you wish to see in the world.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "The best way to predict the future is to invent it.",
    "author": "Alan Kay"
  },
  {
    "text": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "author": "Ralph Waldo Emerson"
  },
  {
    "text": "Success usually comes to those who are too busy to be looking for it.",
    "author": "Henry David Thoreau"
  },
  {
    "text": "I have not failed. I've just found 10,000 ways that won't work.",
    "author": "Thomas Edison"
  }
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
