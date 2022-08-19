let body = document.body; //getting body property to limit the character top and bottom movement
let bodyHeight = parseInt(window.getComputedStyle(body).getPropertyValue('height'));
let gameOver = false;
let gameOverBox = document.getElementById("gameover");
let replayButton = document.getElementById("btn-replay");
let startBox = document.getElementById("start-game");
let startButton = document.getElementById("btn-start");

startButton.addEventListener("click", () => {
  startBox.style.display = "none";

  // Creating and moving obstacles
  function createObstacle() {

    let obstacles = document.getElementById("obstacles");
    let obstacle = document.createElement("div")
    obstacle.setAttribute("class", "obstacle");
    obstacles.appendChild(obstacle);
    let obstacleTopC = Math.floor(Math.random() * (bodyHeight - 100))
    obstacle.style.background = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    // Moving The Obstacles
    let obstaclStartMovement = -100;

    let speed = 4;
    setInterval(() => {   //increasing the speed after each 30 second
      speed++;
    }, 30000);

    function moveObstacle() {

      if (!gameOver) {
        obstaclStartMovement += speed;
      }
      obstacle.style.right = obstaclStartMovement + "px";
      obstacle.style.top = obstacleTopC + "px";

      // Getting Character Properties
      characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));  //This is inside the interval to get the new value when it changes
      characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
      characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
      characterHeight = parseInt(window.getComputedStyle(character).getPropertyValue('height'));

      // Getting Obstacles Properties
      let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
      let obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));
      let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
      let obstacleHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('height'));
      let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));

      // Game Over Logic
      if (characterRight <= obstacleRight + obstacleWidth && characterTop + characterHeight >= obstacleTop && characterTop <= obstacleTop + obstacleHeight && characterRight + characterWidth >= obstacleRight) {
        gameOver = true;
        gameOverBox.style.display = "flex";
        replayButton.addEventListener("click", () => {

          location.reload();
        })

      }
    }
    if (!gameOver) {
      let obstacleTimeOut = setTimeout(createObstacle, Math.floor(Math.random() * 1800) + 300);
      let obstacleInterval = setInterval(moveObstacle, 10);
    }

  }
  if (!gameOver) {
    createObstacle();
  }

  // Character Movement
  let character = document.getElementById("character");
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
  window.addEventListener("keydown", (e) => {

    if (e.key == "ArrowDown") {

      if (characterTop <= bodyHeight - 51) {
        if (!gameOver) {
          characterTop += 5;
        }
        character.style.top = characterTop + "px"
      }
    }

    if (e.key == "ArrowUp") {
      if (characterTop >>= 0) {
        if (!gameOver) {
          characterTop -= 5;
        }
        character.style.top = characterTop + "px"
      }
    }

  })


  // Score Logic
  let scoreBox = document.getElementById("score");
  let score = 0;
  function dispalyScore() {
    if (!gameOver) {
      score++;
    }
    scoreBox.innerHTML = `Score: ${score}`
  }

  setInterval(dispalyScore, 100);
})