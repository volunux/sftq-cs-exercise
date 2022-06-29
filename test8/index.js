let guessNumberField = document.getElementById('guess_number_field');
let guessSubmitBtn = document.getElementById('guess_submit_btn');
let guessRestartBtn = document.getElementById('guess_restart_button');
let guessStatus = document.getElementById('guess_status');
let guessCount = document.getElementById('guess_count');
let numberOfAvailableGuess = 50, randomNumber = 0;

function verify(guess) {
    guess = Number.parseInt(guess);
    --numberOfAvailableGuess;
    if (Number.isNaN(guess)) guess = 0;
    
    if (guess === randomNumber) { 
      guessSubmitBtn.disabled = true;
      return 0; }
    else if (randomNumber < guess) { return -1; }
    else if (randomNumber > guess) { return 1; } 
}

if (guessSubmitBtn) {
  guessSubmitBtn.addEventListener('click', function($evt) {
      let userGuess = guessNumberField ? guessNumberField.value : 0;
      let guessVerification = verify(userGuess);

      if (numberOfAvailableGuess < 0) { 
        $evt.target.disabled = true;
        guessStatus.textContent = 'You lose ' + 'and the correct number is ' + randomNumber;
        guessCount.textContent = 0; }
      else { guessStatus.textContent = guessVerification;
             guessCount.textContent = numberOfAvailableGuess; }

      if (numberOfAvailableGuess === 0) { guessCount.textContent = 'Last Guess and chance'; }
  });
}


if (guessRestartBtn) {
  guessRestartBtn.addEventListener('click', function($evt) {
    guessSubmitBtn.disabled = false;
    randomNumber = genRandom();
    numberOfAvailableGuess = 50;
    guessNumberField.value = "";
    guessStatus.textContent = "";
    guessCount.textContent = "";

  });
}

 function genRandom() {
  return Math.floor((Math.random() * 1000000)) + 1;
}

window.onload = function() {
  randomNumber = genRandom();
  guessCount.textContent = numberOfAvailableGuess;
}