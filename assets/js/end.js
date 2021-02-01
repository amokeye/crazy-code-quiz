const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Save high scores in local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);

// Provide most recent score
finalScore.innerText = mostRecentScore;

// Associate score with username
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    
    // Sorting array to order scores in order of high to low
    highScores.sort ((a,b) => b.score - a.score);

    // Top 5 scores
    highScores.splice(5);

    // Update high score
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // Return to home screen
    window.location.assign("/code-quiz");
};