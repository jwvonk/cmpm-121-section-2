//purposely bad code so students can fix it - can make it worse

import './style.css'

const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const bird = document.getElementById("bird")

const scoreText = document.getElementById("scoreText")

SetText("click/space to start!")

// document.addEventListener('click', () => jump())
document.addEventListener('mousedown', () => {HandleInput()})
document.addEventListener('keydown', (e) => { if (e.code === "Space") HandleInput()})

let gameOver = true
function HandleInput() {
    if (gameOver === true) {
        StartGame()
    } else {
        Jump()
    }
}

let score = 0
function StartGame() {
    console.log("Game started!")
    gameOver = false
    score = 0
    cactus?.classList.add("cactusMove")
    bird?.classList.add("birdMove")
}

setInterval(function () { Main() }, 10)


function Main() {
    if (gameOver == false) {
        score++;
        SetText("Score: " + score)
        CheckGameOver()
    }
}

let isJumping = false
function Jump() {
    if (isJumping == false) {
        isJumping = true
        dino?.classList.add("jump")
        setTimeout(RemoveJump, 500)
    }
}

function RemoveJump() {
    dino?.classList.remove("jump")
    isJumping = false;
}

function CheckGameOver() {

    if (gameOver == false && dino != null && cactus != null && bird != null) {
        //get is dinosaur jumping
        // let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
        let dinoTop = GetPos(dino, "top")

        //get cactus position
        // let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
        let cactusLeft = GetPos(cactus, "left")

        //get bird position
        //let birdleft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"))
        let birdLeft = GetPos(bird, "left")

        //detect collision
        if ((dinoTop >= 150 && Math.abs(cactusLeft) < 7) || dinoTop <= 55 && Math.abs(birdLeft) < 11) {
            EndGame()
        }
        function EndGame() {
            console.log("player died!")
            SetText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true
    
            //reset player
            RemoveJump()
    
            //reset cactus
            RemoveObstacles()

        }


        //detect bird collision
        // if (dinoTop <= 55 && Math.abs(birdleft) < 11) {
        //     //end game
        //     console.log("player died!")
        //     SetText("Final Score: " + score + "! Click To Play Again!")
        //     gameOver = true

        //     //reset player
        //     RemoveJump()

        //     //reset cactus
        //     RemoveObstacles()
        // }
    }
}
function RemoveObstacles() {
    cactus?.classList.remove("cactusMove")
    bird?.classList.remove("birdMove")
}


function GetPos(elem: HTMLElement, name: string): number {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(name))
}

function SetText(s: string) {
    if (scoreText) {
        scoreText.textContent = s
    }
}
