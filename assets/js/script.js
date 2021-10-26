
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
quizQandA.question =  "he condition in an if/else statement is enclosed with _______.";
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

var titleEl = document.getElementById("title-paragraph");
var paragraphText = titleEl.childNodes[0];
paragraphText.data = startQuizText;

var q1Buttons = [];



function startQuiz() {


}