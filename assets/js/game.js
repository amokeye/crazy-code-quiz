const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timerEl = document.getElementById("timer");

var timeLeft = 120;

// variables for question/answer navigation and scoring
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "In Gitbash, what command allows a user move from a file/folder to the immediate parent folder?",
        choice1: "cd ..",
        choice2: "cd parent",
        answer: "1"
    },
    {
        question: "What file should files go into if a user does not wish to publish them to Github?",
        choice1: ".gitignore",
        choice2: "node_modules",
        answer: "1"
    },
    {
        question: "How does a user make comments in a javascript file?",
        choice1: "write 'comment:' and then write out the preferred comment.",
        choice2: "write '//' before the comment and ensure that it's written out on one line.",
        answer: "2"
    },
    {
        question: "How does a user specify an ID selector?",
        choice1: "The '#' sign.",
        choice2: "The '$' sign.",
        answer: "1"
    },
    {
        question: "What indicator should always go at the top of an HTML file?",
        choice1: "<!THIS html>",
        choice2: "<!DOCTYPE html>",
        answer: "2"
    },
    {
        question: "True or False: CSS code can enhance the appearance of a file.",
        choice1: "False",
        choice2: "True",
        answer: "2"
    }
];

// constants
const CORRECT_BONUS = 6;
const MAX_QUESTIONS = 6;

startGame = function () {
    questionCounter = 0;
    score = 0;
    timer = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function startTimer() {
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        window.alert("Game Over! Save your score and try again!");
        // go to end of page
        return window.location.assign("./end.html")
      }
    }, 1000);
}

getNewQuestion = function () {
 
    // when there are no more questions left 
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        // save the player score
        localStorage.setItem("mostRecentScore", score);
        // go to end of page
        return window.location.assign("./end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS; 

    // questions displayed randomly
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }

    // choices if they got the correct or incorrect answer
    choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply =
        // giving it a default value
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            // correct answer will get additional points
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }
            // incorrect answer will get reduced time
            else if (classToApply !== "correct") {
                timeLeft = timeLeft - 10;
            };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply); 
            getNewQuestion(); 
        }, 1000);
     
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();
startTimer();