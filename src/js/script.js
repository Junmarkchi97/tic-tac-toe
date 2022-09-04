//DOM Declarations
const body = document.body
const button = document.querySelector('.button-start')
const startButton = document.querySelector('.start-button')
const selectTurn = document.querySelector('.select-turn')
const container = document.querySelector('.container')
const selectXButton = document.querySelector('.button-X')
const selectOButton = document.querySelector('.button-O')
const turnDisplay = document.querySelector('.turn-display')
const result = document.querySelector('.result')
const resultContainer = document.querySelector('.result-container')
const newGame = document.querySelector('.new-game')
const continueGame = document.querySelector('.continue')
const continueHistory = document.querySelector('.continue-history')
const newGameHistory = document.querySelector('.new-game-history')
const player1Score = document.querySelector('.player1Score')
const player2Score = document.querySelector('.player2Score')
const player1Header = document.querySelector('.player1Header')
const player2Header = document.querySelector('.player2Header')
const history = document.querySelector('.history')
const historyView = document.querySelector('.history-view')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const cell = document.querySelectorAll('.cell')
const cells = Array.from(cell)

//Add Event listeners
button.addEventListener('click', startGame, { once: true })
selectXButton.addEventListener('click', xButton, { once: true})
selectOButton.addEventListener('click', oButton, { once: true})
newGame.addEventListener('click', newGameF)
newGameHistory.addEventListener('click', newGameF)
continueGame.addEventListener('click', continueGameF)
continueHistory.addEventListener('click', continueGameF)
history.addEventListener('click', viewHistory)
previous.addEventListener('click', previousHistory)
next.addEventListener('click', nextHistory)

//Audio Declarations
const clickTurnAudio = new Audio('.././assets/clickTurn.wav')
const backgroundMusic = new Audio('.././assets/background.ogg')
const startButtonAudio = new Audio('.././assets/clickStart.wav')
const containerAudio = new Audio('.././assets/intro.wav')
const selectTurnAudio = new Audio('.././assets/selectTurn.wav')
const clickSound = new Audio('.././assets/clickSound.mp3')
const win = new Audio('.././assets/win.wav')
const draw = new Audio('.././assets/draw.wav')
const historyAudio = new Audio('.././assets/history.wav')
clickTurnAudio.volume = 0.3
backgroundMusic.volume = 0.05
startButtonAudio.volume = 0.3
containerAudio.volume = 0.3
selectTurnAudio.volume = 0.1
clickSound.volume = 0.3
win.volume = 0.3
draw.volume = 0.3
historyAudio.volume = 0.1
backgroundMusic.loop = true

let currentPlayer, firstPlayer, secondPlayer, player1 = 0, player2 = 0, historyBoard = [], boardData = [['','',''],['','',''],['','','']], count = 1, length

//FUNCTIONS---------
function selectTurnButton(){
    clickTurnAudio.play()
    selectTurn.classList.add('hidden')
    setTimeout(() => {
        backgroundMusic.play()
        container.classList.remove('backlight')
        selectTurn.style.display = 'none'
        historyView.style.display = 'flex'
        next.style.display = 'none'
        previous.style.display = 'none'
        continueHistory.innerHTML = 'Restart'
    }, 500)

    player1Score.innerHTML = 0
    player2Score.innerHTML = 0
}

function xButton(){
    selectTurnButton()
    currentPlayer = 'X'
    firstPlayer = currentPlayer
    secondPlayer = 'O'
    player1Header.innerHTML = `Player ${firstPlayer}`
    player2Header.innerHTML = `Player ${secondPlayer}`
    turnDisplay.style.display = 'flex'
    turnDisplay.innerHTML = `${currentPlayer}'s First Turn` 
}

function oButton(){
    selectTurnButton()
    currentPlayer = 'O'
    firstPlayer = currentPlayer
    secondPlayer = 'X'
    player1Header.innerHTML = `Player ${firstPlayer}`
    player2Header.innerHTML = `Player ${secondPlayer}`
    turnDisplay.style.display = 'flex'
    turnDisplay.innerHTML = `${currentPlayer}'s First Turn` 
}

function increment(){
    if(count < historyBoard.length){
        count++
    }
}

function decrement(){
    if(count > 1){
        count--
    }
}

function previousHistory(){
    historyAudio.load()
    historyAudio.play()
    increment()
    length = historyBoard.length - count

    let historyMarker = historyBoard[length]

    cells.forEach((cell) => {
        cell.classList.remove('X')
        cell.classList.remove('O')

        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if(historyMarker[row][col] == 'X'){
                    cells[row * 3 + col].classList.add('X')
                }else if(historyMarker[row][col] == 'O'){
                    cells[row * 3 + col].classList.add('O')
                }
            }
        }
    })

    if(length === 0){
        previous.classList.remove('hover')
        previous.classList.add('disable')
    }else{
        next.classList.remove('disable')
        next.classList.add('hover')
    }

    turnDisplay.style.display = 'flex'
    turnDisplay.innerHTML = `Moves: ${length + 1}`
}

function nextHistory(){
    historyAudio.load()
    historyAudio.play()
    decrement()
    length = historyBoard.length - count
    
    let historyMarker = historyBoard[length] 

    cells.forEach((cell) => {
        cell.classList.remove('X')
        cell.classList.remove('O')

        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if(historyMarker[row][col] == 'X'){
                    cells[row * 3 + col].classList.add('X')
                }else if(historyMarker[row][col] == 'O'){
                    cells[row * 3 + col].classList.add('O')
                }
            }
        }
    })

    if(length === (historyBoard.length - 1)){
        next.classList.remove('hover')
        next.classList.add('disable')
    }else{
        previous.classList.remove('disable')
        previous.classList.add('hover')
    }
    
    turnDisplay.style.display = 'flex'
    turnDisplay.innerHTML = `Moves: ${length + 1}`
}

function newGameF(){
    window.location.reload()
}

function viewHistory(){
    clickTurnAudio.load()
    clickTurnAudio.play()
    historyView.style.display = 'flex'
    turnDisplay.style.display = 'flex'
    resultContainer.style.display = 'none'
    container.classList.add('whitelight')
    newGame.style.display = 'flex'
    continueGame.style.display = 'flex'
    previous.style.display = 'flex'
    next.style.display = 'flex'

    continueHistory.innerHTML = 'Continue Game'
    turnDisplay.innerHTML = `Moves: ${historyBoard.length - count + 1}`
}

function continueGameF(){
    clickTurnAudio.load()
    clickTurnAudio.play()
    backgroundMusic.play()
    previous.className = 'previous hover'
    next.className = 'next disable'
    count = 1
    historyBoard = []
    boardData = [
        ['','',''],
        ['','',''],
        ['','',''] 
    ]

    cells.forEach((cell) => {
        cell.classList.remove('X')
        cell.classList.remove('O')
    })

    backgroundMusic.currentTime = 0
    turnDisplay.style.display = 'flex'
    resultContainer.style.display = 'none'
    historyView.style.display = 'flex'
    container.classList.remove('whitelight')
    next.style.display = 'none'
    previous.style.display = 'none'

    continueHistory.innerHTML = 'Restart'
    turnDisplay.innerHTML = `${currentPlayer}'s First Turn`
    clickCell()
}

function playerAddScore(player,playerScore,playing){
    win.load()
    win.playbackRate = 1.3
    win.play()
    backgroundMusic.pause()
    player++
    playerScore.innerHTML = player

    turnDisplay.style.display = 'none'
    resultContainer.style.display = 'flex'
    result.innerHTML = `Player ${playing} Wins!`
    historyView.style.display = 'none'
}

function changePlayer(){
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X'
    turnDisplay.innerHTML = `It's ${currentPlayer}'s Turn` 
}

function checkForWinner(){
    let winningCom = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let winner = false;
    winningCom.forEach((combination) => {
        var check = combination.every(index => cells[index].className.trim() == `cell ${currentPlayer}`)
        if(check){
            if(firstPlayer == currentPlayer){
                playerAddScore(player1,player1Score,firstPlayer)
                player1++
            } else {
                playerAddScore(player2,player2Score,secondPlayer)
                player2++
            }
            winner = true
        }
    })

    if(boardData[0].indexOf('') === -1 && boardData[1].indexOf('') === -1  && boardData[2].indexOf('') === -1){
        if(winner){
            return
        }else{
            draw.load()
            draw.play()
            backgroundMusic.pause()
            turnDisplay.style.display = 'none'
            resultContainer.style.display = 'flex'
            result.innerHTML = `DRAW!`
            historyView.style.display = 'none'
        }
    }

    changePlayer()
}

function drawMarkers(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            if(boardData[row][col] == 'X'){
                cells[row * 3 + col].classList.add('X')
            }else if(boardData[row][col] == 'O'){
                cells[row * 3 + col].classList.add('O')
            }
        }
    }
    checkForWinner()
}

function placeMarker(index){
    let col = index % 3
    let row = (index - col) / 3
    boardData[row][col] = currentPlayer
    historyBoard.push(boardData.map(array => [...array]))
    drawMarkers()
}

function clickCell(){
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if(cell.className.trim() == 'cell'){
                clickSound.load()
                clickSound.play()
                placeMarker(index)
            }
        })
    });
}

function startGame(){
    startButtonAudio.play()
    setTimeout(() => {
        containerAudio.play()
    }, 500)
    container.style.display = 'flex'
    startButton.classList.add('zoom-out-fade')
    setTimeout(() => {
        startButton.style.display = 'none'
        container.classList.remove('zoom-in-fade')
    }, 300)
    selectTurn.style.display = 'flex'
    container.classList.add('whitelight')
    setTimeout(() => {
        setTimeout(() =>{
            container.classList.add('backlight')
            container.classList.remove('whitelight')
            selectTurnAudio.play()
        }, 300)
        selectTurn.classList.remove('translate-left')
    }, 1000)

    clickCell()
}