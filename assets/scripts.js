
// button to start quiz
// user clicks button[]
// addeventlistner
// timer starts
// countdown, integer reduced by 1 until 0
// user gets question
// DOM Manipulation (writing HTML with Javascript)
// user gets 4 answers
// user clicks answer
// addeventlistner 
// if they get it right get points / if they get wrong minus time
// if/else statements
// user gets next question
// DOM Manipulation (writing HTML with Javascript)
// happen 5 times
// one iteration per answer (button click)
// user answers last question
// if/else statements
// when timer stops or questions answered the game is over
// already done
// users can add initials to their score
// input element for initials, submit button


var startButton = document.querySelector(".start-game");
var questionContainerElement = document.querySelector("#question-container");
var timerElement = document.querySelector(".timer");
var answerButtonsElement = document.querySelector("#answer-buttons");
var questionElement = document.querySelector('#question');
var quizElement = document.querySelector('#quiz-container');
var welcomeElement = document.querySelector('#welcome-container');
var saveScoreButton = document.querySelector('#save-score')
var endGameElement = document.querySelector('#end-game');
var highScoreLink = document.querySelector('.high-score a');
var highScoresElement = document.querySelector('#high-scores');
var finalScoreElement = document.querySelector('#final-score')
// create an object variable for userScore
const gameState = {
    currentQuestion: 0,
    score: 0,
    secondsRemaining: 75
}
var userNameElement = document.querySelector("#name");
var isLocalStorageEmpty = localStorage.getItem("users") === null

if(isLocalStorageEmpty) {
    localStorage.setItem("users", "[]")
}

startButton.addEventListener("click", startGame);
saveScoreButton.addEventListener("click", saveScore);
highScoreLink.addEventListener("click", showScores)

function startGame() {
//hides welcome to the page and shows quiz when start button is clicked
    welcomeElement.className = "hide"
    quizElement.className = "show"
    answerButtonsElement.className ="show"
    startTimer()
    showQuestion()
}

function showNextQuestion() {
    // goes to next question
    gameState.currentQuestion++
    showQuestion()
}

function showQuestion() {
    // create questions object to run the quiz
    var questions = [
        {
            question: "Commonly used data types DO NOT include:",
            answer: [
                { text: "alerts", isCorrect: true },
                { text: "strings", isCorrect: false },
                { text: "booleans", isCorrect: false },
                { text: "numbers", isCorrect: false }]
        },
        {
            question: "The condition in an if/else statment is enclosed within _____.",
            answer: [
                { text: "parenthesis", isCorrect: true },
                { text: "quotes", isCorrect: false },
                { text: "curly brackets", isCorrect: false },
                { text: "commas", isCorrect: false }]
    
        },
        {
            question: "Arrays in JavaScript can be used to store ______.",
            answer: [
                { text: "numbers & strings", isCorrect: false },
                { text: "other arrays", isCorrect: false },
                { text: "booleans", isCorrect: false },
                { text: "all of the above", isCorrect: true }]
        },
        {
            question: "String values must be enclosed within ____ when being assigned to variables.",
            answer: [
                { text: "commas", isCorrect: false },
                { text: "curly brackets", isCorrect: false },
                { text: "quotes", isCorrect: true },
                { text: "parenthesis", isCorrect: false }]
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            answer: [
                { text: "JavaScript", isCorrect: false },
                { text: "console.log", isCorrect: true },
                { text: "terminal/bash", isCorrect: false },
                { text: "for-loops", isCorrect: false }]
        },
    
    ],
    question = questions[gameState.currentQuestion]
    // this identifies the element in the html and places the question in it.

    // this lets the computer know when the game is over and to show final score
    if(gameState.currentQuestion + 1 >= questions.length) {
        // hides the quiz container
        questionContainerElement.className = 'hide'
        // shows the final score container
        endGameElement.className = 'show'
        finalScoreElement.innerText = gameState.score
        return
    }
    questionElement.innerText = question.question
    for (var i = 0; i < question.answer.length; i++) {
        // this identifies the answer-button elements children and places answer options in it.
        answerButtonsElement.children[i].textContent = question.answer[i].text;
        // this identifies the answers and places a value (true or false in it)
        answerButtonsElement.children[i].value = question.answer[i].isCorrect
        answerButtonsElement.children[i].onclick = checkAnswer
    }

}
function checkAnswer(event) {
    console.log(event.target.value)
    if (event.target.value === 'true') {
     gameState.score++;
     
        document.querySelector("#status").innerHTML = `Correct! score = ${gameState.score}`
    }
    else {
        gameState.secondsRemaining = gameState.secondsRemaining - 10;
        document.querySelector("#status").innerHTML = "Wrong!"
    }
    
    showNextQuestion()
}


function startTimer() {
    var timerId = setInterval(function () {
        gameState.secondsRemaining--;
        timerElement.textContent = gameState.secondsRemaining;
        if (gameState.secondsRemaining <= 0) {
            clearInterval(timerId)
            timerElement.innerHTML = "Game Over! ¯\_(ツ)_/¯ ";
        }
    }, 1000);
}

function getScore() {
    // grabs score from local storage
    var storedScore = localStorage.getItem("score")
}

function saveScore() {
    // nameUser grabs user input from webpage
    var nameUser = userNameElement.value;
    // userInfo creates object for user name and their score
    var userInfo = {
        name: nameUser,
        score: gameState.score,
    };
    var users = JSON.parse(localStorage.getItem("users"))
    // this pushes news users into the userInfo array
    users.push(userInfo)

    localStorage.setItem("users", JSON.stringify(users))
    endGameElement.className = "hide"
    showScores()
    
}

function showScores() {
    // grabs users and their scores from local storage
    var users = JSON.parse(localStorage.getItem("users"))
    // places the userInfo into the browser and shows allows the high-score element to be seen.
    highScoresElement.innerHTML = JSON.stringify(users)
    highScoresElement.className = 'show'
    // creates table for high scores
    highScoresElement.innerHTML =
    "<table><th>User</th><th>Score</th>" +
    users
        .map(function (user) {
            return "<tr><td>" +user.name + "</td> <td>" +user.score + "</td></tr>";
        })
        .join("") +
        "</table>";
}

