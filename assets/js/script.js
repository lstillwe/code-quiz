
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
var score = 0;
var timeLeft = 75;
var penalty = 10;

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
        // window.alert("Done!");
        createDoneContent();
    } 
}

function createStartQuizContent() {
    // remove previous content
    // clearContentDivs();

    // Add quiz instructions and start button
    // add paragraph to the title div
    var paragraphEl = document.createElement("P");
    paragraphEl.setAttribute("id",  "title-paragraph");
    paragraphEl.textContent = startQuizText;
    divTitleEl.appendChild(paragraphEl);

    // add button to the buttons div
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id",  "start-button");
    buttonEl.setAttribute("type",  "button");
    buttonEl.textContent = "Start Quiz";
    divButtonsEl.appendChild(buttonEl);

    // add event listsener for click event on each button
    buttonEl.addEventListener("click", runQuiz);
}

function handleQuizAnswerResponse(event) {

    // check answer against correct response
    var answer = event.currentTarget.textContent;
    displayResponse(answer === quizArray[currentQuizQuestionNumber].correctAns);

    // increment to next quiz question
    currentQuizQuestionNumber++;
    // wait a few moments (3 seconds) then run next quiz question
    setTimeout(runQuiz, 2000);
}

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
        var highScores = localStorage.getItem("highScores");
        if (highScores === null) {
            highScores = [];
        } else {
            highScores = JSON.parse(highScores);
        }

        // add this score to the list of scores
        highScores.push(finalScore);
        
        // save list back to local storage

        // go to high score content - param list of all scores

        createHighScoreContent(highScores);

    }
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

// create content for Done processing and add to title div
function createDoneContent() {

    // header stuff here
    var H1El = document.createElement("h1");
    H1El.setAttribute("style",  "font: 28px bold;");
    H1El.textContent = "All Done!";
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("style",  "font-size: 24px;");
    paragraphEl.textContent = "Your final score is: " + score;

    // now do form stuff
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "task-form");

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

function createHighScoreContent(scoreList) {

    clearContentDivs();

    // header stuff here
    var H1El = document.createElement("h1");
    H1El.setAttribute("style",  "font: 28px bold;");
    H1El.textContent = "High Scores";

    // add high scores as list items
    var olEl = document.createElement("ol");
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
    goBackButtonEl.textContent = "Go Back";
    buttongrpEl.appendChild(goBackButtonEl);
    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.setAttribute("class", "btn");
    clearScoresButtonEl.textContent = "Clear High Scores";
    buttongrpEl.appendChild(clearScoresButtonEl);


    divTitleEl.appendChild(H1El);
    divTitleEl.appendChild(olEl);
    divButtonsEl.appendChild(buttongrpEl);
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


/*<form method="POST">
<div class="input-group">
  <label for="initials">Enter initials</label>
  <input type="text" name="initials" id="initials" placeholder="BBK" />
</div>
<button id="submit">Submit</button>
</form> */



// <form id="task-form">
//   <div class="form-group">
//     <input type="text" name="task-name" class="text-input" placeholder="Enter Task Name" />
//   </div>
//   <div class="form-group">
//     <select name="task-type" class="select-dropdown">
//       <option value="" disabled selected>Pick a task type</option>
//       <option value="Print">Print</option>
//       <option value="Web">Web</option>
//       <option value="Mobile">Mobile</option>
//     </select>
//   </div>
//   <div class="form-group">
//     <button class="btn" id="save-task" type="submit">Add Task</button>
//   </div>
// </form>

// var createTaskHandler = function(event) {

//     event.preventDefault();
  
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new task.";
//     tasksToDoEl.appendChild(listItemEl);
//   };