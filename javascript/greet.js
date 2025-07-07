function showGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour >= 0 && hour < 12) {
      greeting = "Good Morning! Hope your day starts with positive energy and great vibes.";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good Afternoon! Keep going strong — you’re doing great today.";
    } else if (hour >= 17 && hour < 21) {
      greeting = "Good Evening! Time to slow down and enjoy the rest of your day.";
    } else {
      greeting = "Good Night! Hope you had a wonderful day — rest well and recharge.";
    }

    document.getElementById("greeting").textContent = greeting;
  }

  showGreeting();