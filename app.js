// eliminate comments
// size and space things appropriately
// use descriptive variable names
// get elements by ids when possible
// install eslint to help with all this
// dont name variables the same as your global variables
// always use stictly equals ===
// never use var
// almost always use arrow functions
// use innerText instead of innerHTML if you are just passign a string in
// only 1 line at the end of a file
// smaller functions
// be consistent with variable naming
// ESLint or Prettier would help with that (for example the extra semicolon on line 64). 
//be consistent in usage of ES6
//there's an unnecessary mix of arrow functions and regular functions. 
//I would also suggest to use let instead of var, cause it's safer.

const score = document.getElementById('pts');
const resetButton = document.getElementById('reset');
const contentBoxBtn = document.getElementById('contentBox');
const borderBoxBtn = document.getElementById('borderBox');

const guessWidth = document.getElementById('guessWidth');
const borderBoxCode = document.querySelector('.code-one');
//Better names needed here
const boxSizing = document.getElementById('box-sizing');
const width = document.getElementById('width');
const margin = document.getElementById('margin');
const padding = document.getElementById('padding');
const border = document.getElementById('border');

const answerButton0 = document.getElementById('answer0');
const answerButton1 = document.getElementById('answer1');
const answerButton2 = document.getElementById('answer2');

let boxBoolean = false;
let bs = 'content-box';
let CSS;
let points = 0;
//autofire this without a function name
function onLoad() {
  window.addEventListener('DOMContentLoaded', reset);
  resetButton.addEventListener('click', reset);
  contentBoxBtn.addEventListener('click', boxSizingProp);
  borderBoxBtn.addEventListener('click', boxSizingProp);
}
onLoad();

function boxSizingProp() {
 if (this.id === 'borderBox') {
    console.log(boxBoolean);
    console.log(bs);
    sizeBorderBox();
 } else {
    sizeContentBox();
 } 
 reset();
}

function sizeBorderBox() {
  boxBoolean = true;
  bs = 'border-box';
  borderBoxBtn.classList.add('selected');
  contentBoxBtn.classList.remove('selected');
  borderBoxCode.style.display = 'block';
}

function sizeContentBox() {
  boxBoolean = false;
  bs = 'content-box';
  contentBoxBtn.classList.add('selected');
  borderBoxBtn.classList.remove('selected');
  borderBoxCode.style.display = 'none';
}

function addPoints(point) {
  points += point;
  score.innerText = points;
  greatJobAnimation();      
}

function greatJobAnimation() {
   const greatJob = document.getElementById('great');
   greatJob.style.transition = 'opacity .5s linear 0s';
   greatJob.style.opacity = 1;    
   setTimeout(() => { greatJob.style.opacity = 0; }, 3000); 
}

function randomNumber(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

function setStyles() {
  const width2 = randomNumber(1, 7);
  const pad = randomNumber(1, 3);
  const brdr = randomNumber(1, 10);
  const mrgn = randomNumber(1, 10);
  const bstyle = bs.toString();
  CSS = [width2, pad, mrgn, brdr];
  
  guessWidth.style.boxSizing = `${bstyle}`;    
  guessWidth.style.width = `${width2}00px`;
  guessWidth.style.padding = `${pad}0px`;
  guessWidth.style.border = `${brdr}px solid pink`;
  guessWidth.style.margin = `${mrgn}px`; 
}

function cssDisplayCodeBox() {
  boxSizing.innerHTML = guessWidth.style.boxSizing;    
  width.innerHTML = guessWidth.style.width;
  padding.innerHTML = guessWidth.style.padding;
  margin.innerHTML = guessWidth.style.margin;
  border.innerHTML = guessWidth.style.border;    
} 
// break this out in to different functions
function answerBtns() {
  let correctAnswer;
  const incorrectAnswer1 = (CSS[0] * 100);
  
  if (boxBoolean === true) {
    correctAnswer = (CSS[0] * 100) + (CSS[2] * 2);
  } else {
    correctAnswer = (CSS[0] * 100) + ((CSS[1] * 10) * 2) + (CSS[2] * 2) + (CSS[3] * 2);
  }
  
  const incorrectAnswer2 = correctAnswer - (CSS[3] * 2);
  const answers = [correctAnswer, incorrectAnswer1, incorrectAnswer2];

  answers.sort((a, b) => a < b);

  const ansButtons = [answerButton0, answerButton1, answerButton2];
  ansButtons.forEach((btn, i) => {
    btn.innerHTML = answers[i];
  
    btn.addEventListener('click', e => {
      checkResult(e, correctAnswer);
    });
  });
}

const resultDisplay = document.querySelector('.result');
resultDisplay,addEventListener('click', e => {
  if( e.target.id === 'reset-won'){
  setStyles();
  cssDisplayCodeBox(); 
  answerBtns(); 
  resultDisplay.style.display = 'none';
  }
  else{
  return false;
  }
});

//check Result 
function checkResult(e,answer){
  let currentNumber = Number(e.target.textContent);
   if(currentNumber === answer && points <= 1){
     addPoints(1);
     reset();
  }else if(currentNumber === answer && points <= 2){
       addPoints(1);
       resultDisplay.style.display = 'flex';
       resultDisplay.innerHTML = `<h1>Congratulation you won the game!!</h1>
                                  <button id='reset-won'>PLAY AGAIN </button>`;
       setTimeout(function(){
         points = 0;
         score.innerHTML = '0'; }, 3000);
 
  }else{
        resultDisplay.style.display = 'none';
       // console.log('im sorry grow number');
  }
}

// reset the game 
function reset(){
  setStyles();
  cssDisplayCodeBox(); 
  answerBtns();
  // resultDisplay.style.display = none;
}
