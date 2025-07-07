const quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
      { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
      { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
      { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
      { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" }
    ];

    function showQuoteOfTheDay() {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
      const quote = quotes[dayOfYear % quotes.length];
      
      document.getElementById("quoteText").textContent = `"${quote.text}"`;
      document.getElementById("quoteAuthor").textContent = `— ${quote.author}`;
    }

    showQuoteOfTheDay();