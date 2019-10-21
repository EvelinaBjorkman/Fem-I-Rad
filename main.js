const gameArea = document.querySelector('#game-area')
const turnCounter = document.querySelector('#turn-counter')
const player = document.querySelector('#turn')
const buttonsArray = []
let turns = 0
const numberOfButtons = 12
let buttonsDisabled = false

for (let y = 0 ; y < numberOfButtons ; y++) {
  const row = document.createElement('div')
  row.classList.add('row')

  buttonsArray[y] = []
  
  for (let x = 0 ; x < numberOfButtons ; x++) {
    const button = document.createElement('button')
    button.classList.add('button')

    buttonsArray[y][x] = button

    button.addEventListener('click', function(event) {

      if (buttonsDisabled) {
        alert(`Vi har en vinnare redan! Vänligen ladda om sidan.`)
      } else {
        if (button.textContent === '') {
          displayTurnInfo(button)
          
          horizontalWinCheck(button, x, y)
          verticalWinCheck(button, x, y)
          diagonalsWinCheck(button, x, y)
        } else {
          alert(`Denna plats är redan tagen! Välj en annan.`)
        }
      }
    })
  
    row.appendChild(button)
  }
    
  gameArea.appendChild(row)
}

function displayTurnInfo(button) {
  if (turns % 2 === 0) {
    button.textContent = '❌'
    player.textContent = 'Det är din tur ⭕!'
  } else {
    button.textContent = '⭕'
    player.textContent = 'Det är din tur ❌!'
  }
  
  turns++
  turnCounter.textContent = `${turns} gånger spelade.`
}

function displayWinner(button) {
  alert(`Vinnaren är ${button.textContent}!`)
  buttonsDisabled = true
}

function horizontalWinCheck(button, x, y) {
  let countCorrect = 0

  for (let i = x -4 ; i <= x + 4 ; i++) {
    if (typeof buttonsArray[i] !== 'undefined') {
      if(buttonsArray[y][i].textContent === button.textContent) {
        countCorrect += 1
        if (countCorrect === 5) {
          displayWinner(button)
          break;
        }
      } else {
        countCorrect = 0
      }
    }
  }
}

function verticalWinCheck(button, x, y) {
  let countCorrect = 0

  for (let i = y -4 ; i <= y + 4 ; i++) {
    if (typeof buttonsArray[i] !== 'undefined') {
      if(buttonsArray[i][x].textContent === button.textContent) {
        countCorrect += 1
        if (countCorrect === 5) {
          displayWinner(button)
          break;
        }
      } else {
        countCorrect = 0
      }
    }
  }
}

function diagonalsWinCheck(button, x, y) {
  let countCorrect = 0

  for (let i = x - 4, j = y - 4 ; i <= x + 4 ; i++, j++) {
    if (typeof buttonsArray[j] !== 'undefined' && typeof buttonsArray[j][i] !== 'undefined') {
      if(buttonsArray[j][i].textContent === button.textContent) {
        countCorrect += 1
        if (countCorrect === 5) {
          displayWinner(button)
          break;
        }
      } else {
        countCorrect = 0
      }
    }
  }

  
  countCorrect= 0

  for (let i = x - 4, j = y + 4 ; i <= x + 4 ; i++, j--) {
    if (typeof buttonsArray[j] !== 'undefined' && typeof buttonsArray[j][i] !== 'undefined') {
      if(buttonsArray[j][i].textContent === button.textContent) {  
        countCorrect += 1
        if (countCorrect === 5) {
          displayWinner(button)
          break;
        }
      } else {
        countCorrect = 0
      }
   }
  }
}