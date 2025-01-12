const correctPassword = "TEqUIEROentodosLosUNIVERSOs";
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const gameContainer = document.getElementById("game-container");
const gameArea = document.getElementById("game-area");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

let level = 1;
let points = [];
let clickIndex = 0;
let gameStarted = false;

// Verificar contraseña
function checkPassword() {
    if (passwordInput.value === correctPassword) {
        passwordScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        startButton.disabled = false;
        resetButton.disabled = false;
    } else {
        errorMessage.classList.remove("hidden");
    }
}

// Iniciar nivel
function startLevel() {
    messageElement.textContent = `Nivel ${level}: Memoriza ${level} puntos.`;
    points = [];
    clickIndex = 0;
    gameStarted = false;

    showPoints(level);
}

// Mostrar puntos
function showPoints(count) {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * (areaWidth - 20);
            const y = Math.random() * (areaHeight - 20);

            points.push({ x, y });

            const pointElement = document.createElement("div");
            pointElement.classList.add("point");
            pointElement.style.left = `${x}px`;
            pointElement.style.top = `${y}px`;
            gameArea.appendChild(pointElement);

            setTimeout(() => {
                pointElement.remove();

                if (i === count - 1) {
                    messageElement.textContent = "Haz clic en los puntos.";
                    gameStarted = true;
                }
            }, 1000);
        }, i * 1500);
    }
}

// Validar clics
gameArea.addEventListener("click", (e) => {
    if (!gameStarted) return;

    const rect = gameArea.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const target = points[clickIndex];
    const distance = Math.sqrt(Math.pow(clickX - target.x, 2) + Math.pow(clickY - target.y, 2));

    if (distance <= 20) {
        clickIndex++;

        if (clickIndex === points.length) {
            if (level === 4) {
                messageElement.textContent = "🎉  Has completado todos los niveles.Continua PULSANDO EL CACTUS ";
                gameStarted = false;
            } else {
                level++;
                setTimeout(startLevel, 1000);
            }
        }
    } else {
        messageElement.textContent = "❌ Fallaste. Inténtalo de nuevo.";
        gameStarted = false;
    }
});

// Botones de iniciar y reiniciar
startButton.addEventListener("click", () => {
    level = 1;
    startLevel();
});

resetButton.addEventListener("click", () => {
    level = 1;
    startLevel();
});
