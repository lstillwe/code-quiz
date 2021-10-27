
// initial all of the quiz questions and answers in an array of objects
var quizArray = [];
var quizQandA = {};
quizQandA.question =  "Commonly used datatypes DO Not Include:";
quizQandA.possibleAns =  ["strings", "booleans", "alerts", "number"];
quizQandA.correctAns = "alerts";
quizArray.push(quizQandA);
// since push() seems to push objects as a pointer into the array,
// have to reset quizQandA variable each time we want to put new values in it
quizQandA = {};
quizQandA.question =  "The condition in an if/else statement is enclosed with _______.";
quizQandA.possibleAns =  ["quotes", "curly brackets", "parenthesis", "square brackets"];
quizQandA.correctAns = "parenthesis";
quizArray.push(quizQandA);
quizQandA = {};
quizQandA.question =  "Arrays in Javascript can be used to store _______.";
quizQandA.possibleAns =  ["numbers and strings", "other arrays", "booleans", "all of the above"];
quizQandA.correctAns = "all of the above";
quizArray.push(quizQandA);
quizQandA = {};
quizQandA.question =  "String values must be enclosed within _______ when being assigned to variables.";
quizQandA.possibleAns =  ["commas", "curly brackets", "quotes", "parenthesis"];
quizQandA.correctAns = "quotes";
quizArray.push(quizQandA);
quizQandA = {};
quizQandA.question =  "A very useful tool used during development and debugging for printing content to the debugger is _______.";
quizQandA.possibleAns =  ["javascript", "terminal bash", "for loops", "console.log"];
quizQandA.correctAns = "console.log";
quizArray.push(quizQandA);

var startQuizText = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
var quizLen = quizArray.length;
var currentQuizQuestionNumber = 0;

// get main content div for control of content
var contentDivEl = document.querySelector(".content");
// get div for title text
var divTitleEl = document.querySelector("#title");
// get div for quiz buttons
var divButtonsEl = document.querySelector("#buttons");
// get div for any quiz responses
var divResponseEl = document.querySelector("#response");


// set initial start state for quiz
createStartQuizContent();



// clear all children from the divs defined in the <content> section
function clearContentDivs() {
    divTitleEl.innerHTML = "";
    divButtonsEl.innerHTML = "";
    divResponseEl.innerHTML = "";
}

// ask quiz questions - checks global vars quizLen and currentQuizQuestionNumber
// to make sure there are more questions to ask
function runQuiz() {
    clearContentDivs();

    // check to make sure there are more questions to ask
    if (currentQuizQuestionNumber < quizLen) {
        createQuizQuestionContent(quizArray[currentQuizQuestionNumber]);
    }
    else {
        // do highscore stuff here
        window.alert("Done!");
    } 
}

function createStartQuizContent() {
    // remove previous content
    // clearContentDivs();

    // Add quiz instructions and start button
    // add paragraph to the title div
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("id",  "title-paragraph");
    paragraphEl.textContent = startQuizText;
    divTitleEl.appendChild(paragraphEl);

    // add button to the buttons div
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id",  "start-button");
    buttonEl.setAttribute("type",  "button");
    buttonEl.textContent = "Start Quiz";
    divButtonsEl.appendChild(buttonEl);

    buttonEl.addEventListener("click", runQuiz);
}

function handleQuizAnswerResponse(evt) {

    // check answer against correct response
    var answer = evt.currentTarget.textContent;
    displayResponse(answer === quizArray[currentQuizQuestionNumber].correctAns);

    // increment to next quiz question
    currentQuizQuestionNumber++;
    // wait a few moments (3 seconds) then run next quiz question
    setTimeout(runQuiz, 3000);
}

function createQuizQuestionContent(qObject) {

    // Add quiz instructions and start button
    // add paragraph to the title div
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("id",  "title-paragraph");
    paragraphEl.textContent = qObject.question;
    divTitleEl.appendChild(paragraphEl);

    // add button to the buttons div
    var qButtons = qObject.possibleAns;
    for (i=0; i< qButtons.length; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("id",  "button" + i);
        buttonEl.setAttribute("type",  "button");
        buttonEl.textContent = qButtons[i];
        divButtonsEl.appendChild(buttonEl);

        buttonEl.addEventListener("click", handleQuizAnswerResponse);
    }
    
}

function createDoneContent() {
}

function createHighScoreContent() {
}

function displayResponse(correct) {

    var h3El = document.createElement("h3");

    if(correct) {
        h3El.textContent = "Correct!"
    }
    else {
        h3El.textContent = "Wrong!"
    }
    divResponseEl.appendChild(h3El);
}