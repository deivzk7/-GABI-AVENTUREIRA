let gameOver = false;
let gabi = document.getElementById("gabi");
let gabiName = document.getElementById("gabi-name");
let obstacle = document.getElementById("obstacle");
let restartButton = document.getElementById("restart-btn");
let trajectoryCounter = document.getElementById("trajectory-counter");
let congratulationsMessage = document.getElementById("congratulations-message");

let distance = 0; // Variável para contar a distância

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !gameOver) {
        if (!gabi.classList.contains("jump")) {
            gabi.classList.add("jump");
            setTimeout(() => gabi.classList.remove("jump"), 500);
        }
    }
});

function checkCollision() {
    let gabiRect = gabi.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // Verifica se há colisão entre Gabi e o obstáculo
    if (
        gabiRect.right > obstacleRect.left &&
        gabiRect.left < obstacleRect.right &&
        gabiRect.bottom > obstacleRect.top &&
        gabiRect.top < obstacleRect.bottom
    ) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    restartButton.style.display = "block"; // Exibe o botão de reiniciar
    obstacle.style.animation = "none";  // Para o movimento do obstáculo
}

// Função para atualizar a posição do obstáculo e o contador de distância
function updateObstaclePosition() {
    if (!gameOver) {
        let obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);
        if (obstaclePosition >= 800) {
            obstacle.style.right = "0px";
        } else {
            obstacle.style.right = obstaclePosition + 2 + "px";
        }

        // Incrementa o contador de distância
        distance++;
        trajectoryCounter.textContent = "Distância: " + distance;

        // Verifica se a distância atingiu 1000 e exibe a mensagem de parabéns
        if (distance === 1000) {
            congratulationsMessage.style.display = "block"; // Exibe a mensagem
            setTimeout(() => {
                congratulationsMessage.style.display = "none"; // Esconde após 3 segundos
            }, 3000);
        }

        checkCollision();
    }
}

setInterval(updateObstaclePosition, 20);  // Atualiza a posição do obstáculo a cada 20ms

// Função para reiniciar o jogo
restartButton.addEventListener("click", function () {
    gameOver = false;
    restartButton.style.display = "none"; // Esconde o botão de reiniciar
    obstacle.style.animation = "moveObstacle 2s linear infinite";  // Reinicia a animação do obstáculo
    obstacle.style.right = "0px";  // Reseta a posição do obstáculo
    gabi.style.left = "50px";  // Reseta a posição do personagem
    gabi.style.bottom = "10px";  // Reseta a posição do personagem

    // Reseta a distância
    distance = 0;
    trajectoryCounter.textContent = "Distância: 0";
});
