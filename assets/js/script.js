
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
var interval = null;
var quizTimeLen = 75;
var timeLeft = 0;
var penalty = 10;

// get main content div for control of content
var contentDivEl = document.querySelector(".content");
// get div for title text
var divTitleEl = document.querySelector("#title");
// get div for quiz buttons
var divButtonsEl = document.querySelector("#buttons");
// get div for any quiz responses
var divResponseEl = document.querySelector("#response");

// catch click of view scores link
//$("#viewscores").onclick = createHighScoreContent;
document.querySelector("#viewscores").addEventListener("click", function() {
    createHighScoreContent([]);
});


// set initial start state for quiz
createStartQuizContent();


// check to make sure there is still time remaining
function checkTime() {

    if (timeLeft <= 0) {
        // Game is over - go to done screen
        timeLeft = 0;
        setCountdownValue(0);
        createDoneContent();
        clearInterval(interval);
    }
    setCountdownValue(timeLeft);
}

// handle the setInterval timer events
function handleTimerEvent() {
    timeLeft--;
    checkTime();
}

// update the time value in the header of the page
function setCountdownValue(theTime) {
    countdownEl = document.querySelector("#countdown").textContent = "Time: " + theTime;
}

// clear all children from the divs defined in the <content> section
function clearContentDivs() {
    divTitleEl.innerHTML = "";
    divButtonsEl.innerHTML = "";
    divResponseEl.innerHTML = "";
}

// get highscores out of local storage
function getHighscores() {

    var highScores = localStorage.getItem("highScores");
    if (highScores === null) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }

    return highScores;
}

// clear all of the scores saved in local storage
function clearHighScores() {

    // remove high scores string from local storage
    localStorage.removeItem("highScores");

    // reload high scores content
    createHighScoreContent();
}

// create the elements for the 
function createStartQuizContent() {
    // remove previous content and reset counters
    clearContentDivs();
    currentQuizQuestionNumber = 0;
    setCountdownValue(0);
    timeLeft = quizTimeLen;

    // Add quiz instructions and start button
    // add header & paragraph to the title div
    var h1El = document.createElement("h1");
    h1El.textContent = "Coding Quiz Challenge";
    h1El.setAttribute("id", "main-title");
    var paragraphEl = document.createElement("P");
    paragraphEl.setAttribute("id",  "title-paragraph");
    paragraphEl.textContent = startQuizText;
    divTitleEl.appendChild(h1El);
    divTitleEl.appendChild(paragraphEl);

    // add button to the buttons div
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id",  "start-button");
    buttonEl.setAttribute("type",  "button");
    buttonEl.textContent = "Start Quiz";
    divButtonsEl.appendChild(buttonEl);

    // add event listener for click event on each button
    buttonEl.addEventListener("click", runQuiz);
}

// ask quiz questions - checks global vars quizLen and currentQuizQuestionNumber
// to make sure there are more questions to ask
function runQuiz() {
    clearContentDivs();

    // start timer if this is the first question
    if (currentQuizQuestionNumber === 0) {
        interval = setInterval(handleTimerEvent, 1000);
        setCountdownValue(quizTimeLen);
    }

    // check to make sure there are more questions to ask
    if (currentQuizQuestionNumber < quizLen) {
        createQuizQuestionContent(quizArray[currentQuizQuestionNumber]);
    }
    else {
        // stop timer
        clearInterval(interval);
        // do highscore stuff here
        createDoneContent();
    } 
}

// this function compares the users question response
// to the correct response and displays correct or wrong
function handleQuizAnswerResponse(event) {

    // check answer against correct response
    var answer = event.currentTarget.textContent;
    displayResponse(answer === quizArray[currentQuizQuestionNumber].correctAns);

    // increment to next quiz question
    currentQuizQuestionNumber++;
    // wait a few moments (2 seconds) then run next quiz question
    setTimeout(runQuiz, 2000);
}

// show answer response - correct or wrong
function displayResponse(correct) {

    var h3El = document.createElement("h3");

    if(correct) {
        h3El.textContent = "Correct!"
    }
    else {
        h3El.textContent = "Wrong!"
        // penalty!
        timeLeft -= penalty;
    }
    divResponseEl.appendChild(h3El);
}

// this function handles the save high score form submit
function handleSubmitButtonClick(event) {

    event.preventDefault();

    var initials = document.querySelector("#initials").value;
    
    // check to make sure the user has actually entered initials
    if ( initials === "") {
        window.alert("Please enter your initials");
    }
    else {
        // construct object for final score
        var finalScore = {
            initials: initials,
            score: timeLeft
        }

        // retrieve previously saved high scores, if any
        var highScores = getHighscores();

        // add this score to the list of scores
        highScores.push(finalScore);
        
        // save list back to local storage
        var scoresStr = JSON.stringify(highScores);
        localStorage.setItem("highScores", scoresStr);

        // go to high score content - param list of all scores
        createHighScoreContent();

    }
}

// view for each question in the quiz
function createQuizQuestionContent(qObject) {

    // Add quiz instructions and start button
    // add paragraph to the title div
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("id",  "title-paragraph");
    paragraphEl.textContent = qObject.question;
    divTitleEl.appendChild(paragraphEl);

    // create ordered list
    var olEl = document.createElement("ol");
    olEl.setAttribute("style", "padding-left: 0;");

    // add li elements to the buttons div
    var qButtons = qObject.possibleAns;
    for (i=0; i< qButtons.length; i++) {
        var liEl = document.createElement("li");
        liEl.setAttribute("id",  "button");
        liEl.textContent = qButtons[i];
        olEl.appendChild(liEl);

        liEl.addEventListener("click", handleQuizAnswerResponse);
    }

    divButtonsEl.appendChild(olEl);
}

// create content for Done processing and add to title div
function createDoneContent() {

    clearContentDivs();

    // header stuff here
    var H1El = document.createElement("h1");
    H1El.setAttribute("style",  "font-size: 28px;");
    H1El.textContent = "All Done!";
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("style",  "font-size: 24px;");
    paragraphEl.textContent = "Your final score is: " + timeLeft;

    // now do form stuff
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "form");

    // label and text input
    var formgrp1El = document.createElement("div");
    formgrp1El.setAttribute("class", "form-group");
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter initials";
    formgrp1El.appendChild(labelEl);
    var textInputEl = document.createElement("input");
    textInputEl.setAttribute("type", "text");
    textInputEl.setAttribute("name", "initials");
    textInputEl.setAttribute("id", "initials");
    textInputEl.setAttribute("placeholder", "JFK");
    formgrp1El.appendChild(textInputEl);

    // submit button
    var formgrp2El = document.createElement("div");
    formgrp2El.setAttribute("class", "form-group");
    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("class", "btn");
    submitButtonEl.setAttribute("id", "submit");
    submitButtonEl.textContent = "Submit";
    formgrp2El.appendChild(submitButtonEl);

    // add 2 form-group divs to form
    formEl.appendChild(formgrp1El);
    formEl.appendChild(formgrp2El);

    divTitleEl.appendChild(H1El);
    divTitleEl.appendChild(paragraphEl);
    divTitleEl.appendChild(formEl);

    // now add listener for submit button
    formEl.addEventListener('submit', handleSubmitButtonClick);
}

// create content for high scores view
function createHighScoreContent() {

    clearContentDivs();

    // header stuff here
    var H1El = document.createElement("h1");
    H1El.setAttribute("style",  "font-size: 28px;");
    H1El.textContent = "High Scores";

    // retrieve high scores from local storage
    scoreList = getHighscores();

    // check and see if there are any scores first
    // create and empty entry if not
    if (scoreList.length === 0) {
        var score = {
            initials: "No scores have been saved yet",
            score: ""
        }
        scoreList.push(score);
    }
    // add high scores as list items
    var olEl = document.createElement("ol");
    olEl.setAttribute("id", "score-ol");
    for(var i=0; i< scoreList.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = scoreList[i].initials + " - " + scoreList[i].score;
        olEl.appendChild(liEl);
    }

    // add go back and clear high score buttons
    var buttongrpEl = document.createElement("div");
    buttongrpEl.setAttribute("class", "buttongrp");
    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.setAttribute("class", "btn");
    goBackButtonEl.setAttribute("id", "go-back-btn");
    goBackButtonEl.textContent = "Go Back";
    buttongrpEl.appendChild(goBackButtonEl);
    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.setAttribute("class", "btn");
    clearScoresButtonEl.setAttribute("id", "clear-score-btn");
    clearScoresButtonEl.textContent = "Clear High Scores";
    buttongrpEl.appendChild(clearScoresButtonEl);

    // add created content to high level divs
    divTitleEl.appendChild(H1El);
    divTitleEl.appendChild(olEl);
    divButtonsEl.appendChild(buttongrpEl);

    // finally add button event listeners
    goBackButtonEl.addEventListener("click", createStartQuizContent);
    clearScoresButtonEl.addEventListener("click", clearHighScores);
}