//score
var pts    = document.getElementById('pts');
//top buttons
var resetButton   = document.querySelector("#reset");
var contentBoxBtn = document.getElementById('contentBox');
var borderBoxBtn  = document.getElementById('borderBox');
//guessWidth element
var guessWidth  = document.getElementById('guessWidth');
var borderBoxCode = document.querySelector('.code-one');
//css display css css css
var boxSizing   = document.getElementById('box-sizing');
var width   = document.getElementById('width');
var margin  = document.getElementById('margin');
var padding = document.getElementById('padding');
var border  = document.getElementById('border');
//answer buttons
var ansBtn0 = document.getElementById('answer0');
var ansBtn1 = document.getElementById('answer1');
var ansBtn2 = document.getElementById('answer2');
// var hide = document.querySelector('.none');
var boxBoolean = false;
var bs = 'content-box';
var CSS;
var points = 0;

//start game from dom loaded
window.addEventListener('DOMContentLoaded',reset);
//new width btn reset all
resetButton.addEventListener("click",reset);
contentBoxBtn.addEventListener("click",boxSizingProp);
borderBoxBtn.addEventListener("click",boxSizingProp);
//adds css to selected button and changes answers and box-sizing 
function boxSizingProp(){
  //if borderBox is true/ btn press
 if(this.id == 'borderBox'){
     boxBoolean = true;
     bs = 'border-box';
     this.classList.add('selected');
     contentBoxBtn.classList.remove('selected');
     borderBoxCode.style.display = 'block';
 }else{
     //contentBox is true/ btn press
     boxBoolean = false;
     bs =  'content-box';
     this.classList.add('selected');
     borderBoxBtn.classList.remove('selected');
     borderBoxCode.style.display = 'none';
 } 
 reset();
}

function addPoints(i){
  points += i;
  pts.innerHTML = points;
  greatJob();      
}
//fade-in-and-out greatJob!
function greatJob(){
   var elem = document.getElementById('great');
   elem.style.transition =" opacity .5s linear 0s";
   elem.style.opacity = 1;    
   setTimeout(function(){
   elem.style.opacity = 0;           
   ;}, 3000);    
}

//create a random number function 
function randomNumber(min,max){
  return Math.floor(Math.random() * (max - min + 1)+ min );
}
// give the guessWidth element random styles
function setStyles() {
  var width  = randomNumber(1,7);
  var pad    = randomNumber(1,3);
  var brdr   = randomNumber(1,10);
  var mrgn   = randomNumber(1,10);
  var bstyle = bs.toString();
  CSS = [width, pad, mrgn, brdr];
  guessWidth.style.boxSizing = `${bstyle}`;    
  guessWidth.style.width     = `${width}00px`;
  guessWidth.style.padding   = `${pad}0px`;
  guessWidth.style.border    = `${brdr}px solid pink`;
  guessWidth.style.margin    = `${mrgn}px`; 
}
//displays css properties in code box
function cssDisplay(){
  boxSizing.innerHTML  = guessWidth.style.boxSizing;    
  width.innerHTML      = guessWidth.style.width;
  padding.innerHTML    = guessWidth.style.padding;
  margin.innerHTML     = guessWidth.style.margin;
  border.innerHTML     = guessWidth.style.border;    
} 

function answerBtns(){
  // Random answers 
  var correct;
  // diff answers depending on whether or not boxBoolean is true    
  // if border box is true correct answer
  if(boxBoolean == true){
    correct  = (CSS[0]*100)+(CSS[2]*2);
  }else{
    correct = (CSS[0]*100)+((CSS[1]*10)*2)+(CSS[2]*2)+(CSS[3]*2);
  }
  var incorrect1 = (CSS[0]*100);
  var incorrect2 = correct - (CSS[3]*2);
  var answers    = [correct, incorrect1, incorrect2];
  //sort the answers
  answers.sort((a,b) => 0.5 - Math.random());
  var ansButtons = [ansBtn0, ansBtn1, ansBtn2];
  ansButtons.forEach((btn,i) => {
    btn.innerHTML = answers[i];
    //add event listener 
    btn.addEventListener('click',e => {
      checkResult(e,correct);
    });
  });
}

const resultDisplay = document.querySelector('.result');
resultDisplay,addEventListener('click', e => {
  if( e.target.id === 'reset-won'){
  setStyles();
  cssDisplay(); 
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
         pts.innerHTML = '0'; }, 3000);
 
  }else{
        resultDisplay.style.display = 'none';
       // console.log('im sorry grow number');
  }
}

// reset the game 
function reset(){
  setStyles();
  cssDisplay(); 
  answerBtns();
  // resultDisplay.style.display = none;
}


