
// button to start quiz
    // user clicks button
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
var questionContainerEl =document.getElementById("question-container");
var timerElement = document.querySelector(".timer");
var answerButtonsElement = document.getElementById("answer-buttons");
var questionElement = document.getElementById('question');
var timer;
var timerCount;
var currentQuestionIndex;


startButton.addEventListener("click",startGame);
var question = [
    {
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text: "alerts", correct: true},
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "numbers", correct: false}]
    },
    {
        question: "The condition in an if/else statment is enclosed within _____.",
        answer: [
            {text: "parenthesis", correct: true},
            {text: "quotes", correct: false},
            {text: "curly brackets", correct: false},
            {text: "commas", correct: false}]
   
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answer: [
            {text: "numbers & strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true}]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer: [
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "quotes", correct: true},
            {text: "parenthesis", correct: false}]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: [
            {text: "JavaScript", correct: false},
            {text: "console.log", correct: true},
            {text: "terminal/bash", correct: false},
            {text: "for-loops", correct: false}]
    },

]

function startGame() {
    timerCount= 75;
   document.getElementById('page-1').style.display="none";
   document.getElementById('page-2').style.display='block';
    currentQuestionIndex = 0 
    startTimer()
    showQuestion()
}

function showQuestion() {
// this identifies the element in the html and places the question in it.
    questionElement.innerText = question[currentQuestionIndex].question
    for (var i = 0; i < question[currentQuestionIndex].answer.length; i++){
// this identifies the answer-button elements children and places answer options in it.
        answerButtonsElement.children[i].textContent = question[currentQuestionIndex].answer[i].text;
     answerButtonsElement.children[i].value=question[currentQuestionIndex].answer[i].correct 
     answerButtonsElement.children[i].onclick=checkAnswer  
    }
   
}
function checkAnswer(event) {
    console.log(event.target.value)
    if (event.target.value === "false"){
        alert("Wrong");
    }
    else alert("Correct!");

    showQuestion()
}


function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            timer.textcontent = "Times Up!";
        }
    }, 1000);
}


