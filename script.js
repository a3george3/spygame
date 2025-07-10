let jobsList = [];
let selectedJob = "";
let playerCount = 0;
let roles = [];
let currentPlayer = 0;

// Fetch jobs from JSON file
fetch("jobs.json")
  .then((response) => response.json())
  .then((data) => {
    jobsList = data.jobs;
  });

// Start New Game button
document.getElementById("startGame").addEventListener("click", () => {
  playerCount = parseInt(document.getElementById("playerCount").value, 10);

  if (playerCount < 3) {
    alert("Minimum 3 players!");
    return;
  }

  // Choose a random location from the list
  selectedJob = jobsList[Math.floor(Math.random() * jobsList.length)];

  // Prepare roles: one SPY, rest get the location
  roles = Array(playerCount - 1).fill(selectedJob);
  roles.push("SPY");

  // Shuffle roles
  roles = shuffleArray(roles);

  // Reset player counter
  currentPlayer = 0;

  // Hide setup screen, show first reveal prompt
  document.getElementById("setup").classList.add("hidden");
  showRevealPrompt();
});

// Reveal Button (on "Show your card" screen)
document.getElementById("revealButton").addEventListener("click", () => {
  showCurrentCard();
});

// Next Button (after seeing the card)
document.getElementById("nextButton").addEventListener("click", () => {
  currentPlayer++;

  if (currentPlayer >= playerCount) {
    // All players have seen their cards
    document.getElementById("screenCard").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
  } else {
    // Go to reveal prompt for next player
    showRevealPrompt();
  }
});

// Restart Button
document.getElementById("restartButton").addEventListener("click", () => {
  document.getElementById("endScreen").classList.add("hidden");
  document.getElementById("setup").classList.remove("hidden");
});

// Show the "Get ready" prompt screen
function showRevealPrompt() {
  document.getElementById("screenCard").classList.add("hidden");
  document.getElementById("screenRevealPrompt").classList.remove("hidden");
  document.getElementById("playerIndicator").textContent = `Player ${
    currentPlayer + 1
  }, get ready!`;
}

// Show the actual role card
function showCurrentCard() {
  document.getElementById("screenRevealPrompt").classList.add("hidden");
  document.getElementById("screenCard").classList.remove("hidden");
  document.getElementById("roleText").textContent = roles[currentPlayer];
}

// Utility: Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
