// Create Selectors for html ID's
const gameTitle = document.querySelector('#gameTitle');
const startupScreen= document.querySelector('#startupScreen');
const rulesButton= document.querySelector('#rulesBtn');
const rulesScreen= document.querySelector('#rules')
const startButton= document.querySelector("#startBtn")
const questionContain= document.querySelector('#questionContainer');
const questionText=document.querySelector('#questionText')
const multipleChoice= document.querySelector('#multipleChoice');
const resultScreen = document.querySelector('#resultScreen')
const playerScore =document.querySelector('#playerScore')
const timerDisplay = document.querySelector('#timer');
const initialsInput = document.querySelector('#initialsInput')
const submitButton=document.querySelector('#submitBtn')
// score when starting
let score=0;
// timer starting point
let timeLeft = 100;

function updateTimer() {
  // adds the timer display to the html
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        // ends game if timer runs out
        displayResult(); 
    } else {
      // if there is still time left decrement time
        timeLeft--; 
    }
}
// starting postion of the game
rulesScreen.style.display='none';
questionContain.style.display='none';
resultScreen.style.display='none';
// invokes when the rules button is clicked
rulesButton.addEventListener('click',() =>{
    startupScreen.style.display='none';
    rulesScreen.style.display='block';
});
// invokes when start button is clicked
startButton.addEventListener('click',() =>{
    rulesScreen.style.display='none';
    questionContain.style.display='block';
    timerInterval = setInterval(updateTimer, 1000); 
    // displays the first question in the index
    displayQuestion(0); 
});

// questions array 
const questions = [
{question:'Which HTML tag is used to define a hyperlink',
choices:['<link>','<href>','<a>','<Hyperlink>'],
answer:2
},
{question:'What is the correct way to declare a Variable in javascript',
choices:['const','let','variable','var'],
answer:3
},
{question:'What is the correct CSS property for styling text color',
choices:['text-color','color','font-color','text-style'],
answer:1
},
{question:'What Does CSS stand for',
choices:['Computive Style Sheets','Creative Style Sheets','Cascading Style Sheets','Colorful Style Sheets'],
answer:2
},
{question:'Which Operator Means Strictly Equal in javascript',
choices:['===','!=','=','=='],
answer:0
},
{question:'Which Operator is the Assignment Operator',
choices:['!=','==','===','='],
answer:3
},
{question:'Which of the following is not a datatype in javascript',
choices:['Boolean','Null','String','Var'],
answer:3
},
{question:'What Does the document.getElementById() Function Do',
choices:['Creates A new Element','Allows you to select and element by using its id attribute ','Adds an Event Listner','All of The Above'],
answer:1
},
{question:'Which of the following is not a css pseudo class',
choices:[':hover',':focus',':active',':enlarge'],
answer:3
},
{question:'What is the Purpose if event.preventDefault()',
choices:['It Invokes the default action of the event','It Deletes Event listners','It prevents the default action of the event','None of the Above'],
answer:2
},
]

let currentQuestion=0
// function for cycling through questions
function displayQuestion(index) {
  // Get the question object at the specified index
  let question = questions[index];
  // change the text content in the html to the current questions text could also use innerhtml
  questionText.textContent= question.question;
  // clears the text content for multiple choice
  multipleChoice.textContent='';
// loop through each choice in the question
  question.choices.forEach((choice,i)=> {
//create a button element for each choice 
  const choiceEl =document.createElement('button');
  // change the textcontent for each choice depending on question- could also use inner html
  choiceEl.textContent=choice;
  // create an event listner to invoke user choice (questions index, the questions answer)
  choiceEl.addEventListener('click', () => userChoice(i,question.answer));
  // append the choice element to the multiple choice div
  multipleChoice.appendChild(choiceEl);
  
}); 
}
// function for storing answers to local storage
function storeAnswer(currentQuestion,choiceIndex){
  const storageKey =`answer_${currentQuestion}`;
  localStorage.setItem(storageKey,choiceIndex);
}




function userChoice(choiceIndex,correctAnswer){
  const choiceButtons =document.querySelectorAll('#multipleChoice button');
  // Party of my timeout command
  choiceButtons.forEach(button => {button.disabled =true
  })
  // if the choiceIndex is strictly equal to the correct answer increment the score
if (choiceIndex === correctAnswer){
  score++;
console.log('Correct Answer');
// invokes the display notification button below 
displayNotification('Correct')
}

else {
  // logs to console
console.log('Incorrect Answer');
// invokes the displaynotification function displayed below
displayNotification('Incorrect',)
}

storeAnswer(currentQuestion,choiceIndex)
// adds a 500 milisecond timeout between questions
currentQuestion++;
if (currentQuestion<questions.length){
  setTimeout(() => {displayQuestion(currentQuestion)
  displayQuestion(currentQuestion);
  choiceButtons.forEach(button =>{
    button.disabled=false;
  });
}, 500);

}
else{
  displayResult();
  }
// append the question text and the answers to the question container
questionContain.textContent='';
questionContain.appendChild(questionText);
questionContain.appendChild(multipleChoice);
}
// a display notification text for right and wrong answers
function displayNotification(message){
  // creates a new div element to display notification text
  const notification = document.createElement('div')
//
  notification.textContent=message;
  notification.classList.add('notification')

  questionContain.appendChild(notification)
  document.querySelector('main').appendChild(notification)
  // sets a 500 milisecond timeout so notification does not stay on screen
  setTimeout(() => {
    notification.remove();
    console.log("Notification Removed ");
}, 500);
}
  
// displays the result screen
function displayResult(){
  // logs to the console
  console.log("displaying result")
  // gets rid of display for everything but the result screen
  timerDisplay.style.display='none';
  questionContain.style.display='none';
  resultScreen.style.display='block';
  playerScore.textContent=score;
  // appends results to main document * it didnt work for me without this please explain why
  document.querySelector('main').appendChild(resultScreen)

}




// event lisner for entering saving score to the highscores page 
submitButton.addEventListener('click',()=>{
  const initials =initialsInput.value;
  saveScore(initials,score);
  // reloads the page when the submit button is clicked
  location.reload()
} )


// function for retriving scores and pushing 
function saveScore(initials,score){
// Create a new score object with initials and score properties
  const newScore = {initials,score}
  // Retrieve existing scores from local storage or initialize an empty array if no scores exist
  const scores =JSON.parse(localStorage.getItem('scores')) || [];
// push the new score object into the scores array
  scores.push(newScore)
// store the updated scores along with the initials into the scores array
  localStorage.setItem('scores',JSON.stringify(scores))
}


