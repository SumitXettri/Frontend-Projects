const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");

const getRandomQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Failed to fetch the quote.");
    const data = await response.json();
    const quote = data.content;
    const author = data.author;

    quoteText.textContent = `"${quote}"`;
    quoteAuthor.textContent = `- ${author || "Unknown"}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

document.getElementById("new-quote").addEventListener("click", getRandomQuote);
window.onload = getRandomQuote;
