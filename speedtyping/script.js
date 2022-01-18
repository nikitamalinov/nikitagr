const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const btn = document.getElementById("btn")
var runProgram = false
quoteInput.disabled = true;
 
btn.addEventListener("click", updateBtn);

quoteInput.addEventListener('input', () => {
  //get everysingle character in quote
  const arrayQuote = quoteDisplay.querySelectorAll('span')
  //get every single input value
  const arrayValue = quoteInput.value.split('')

  let correct = true
  //color each character
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  //if everything is correct, start new quote
  if (correct) renderNewQuote()
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL) //fetch API
    .then(response => response.json()) //.then returns a promise which we want in json
    .then(data => data.content) 
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplay.innerHTML = ''
  quoteInput.value = null
  //want to create seperate characters in the text quote
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplay.appendChild(characterSpan)
  })
  //nothing in the textbox when starting out
  
  startTimer()
}

//gets date when we start our timer
let startTime
function startTimer() {
  //current time
  startTime = new Date() 
  //call it every 1 second
  setInterval(() => {
    //set text to time we got
  if(runProgram == false){
    timerElement.innerText = "Time Left: 60"
    return;
  }    

    timer.innerText = "Time Left: " + (60 - getTimerTime())
    if(timer.innerText === "Time Left: 0"){
      timerElement.innerText = "Time Left: 60"
      renderNewQuote()
    }

  }, 1000)
}

//get time in seconds
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}


function updateBtn() {
  if(btn.innerHTML === "Start"){
    quoteInput.disabled = false;
    quoteInput.focus()
    runProgram = true
    renderNewQuote()
    btn.innerHTML = "End"
  }
  else{
    quoteInput.disabled = true;
    runProgram = false
    btn.innerHTML = "Start"
  }


}


