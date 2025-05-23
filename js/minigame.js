document.addEventListener('DOMContentLoaded', () => {
    const carsForGame = [
        { name: 'Audi R8', price: 150000, image: 'https://media.audi.com/is/image/audi/nemo/models/r8/r8-coupe-v10-performance/my-2021/derivative-startpage/stage-large-image/1920x1080-audi-r8-coupe-performance-ar8_ae_2020_2438.jpg?width=1920' },
        { name: 'ferrari f50', price: 250000, image: 'https://cdn.ferrari.com/cms/network/media/img/resize/66d72c85db6d16001154cfd2-1995_f50_image-04?width=1920&height=1080' },
        { name: 'lamborghini huracan', price: 480000, image: 'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/huracan/2023/09_18_refresh/s/gw_hura_s_02.jpg' },
        { name: 'mazda mx-5', price: 50000, image: 'https://inchcapelatam.sirv.com/Mazda%20Per%C3%BA/MX-5/HIGH/Gray-Machine.png?w=720' },
        { name: 'mustang', price: 62000, image: 'https://www.ford.pe/content/dam/Ford/website-assets/latam/pe/nameplate/mustang/2024/overview/colorizer/negro-profundo/fpe-nameplate-mustang-color-negro-profundo.jpg.dam.full.high.jpg/1712938711205.jpg' }
    ];

    let currentCar = null;
    let attempts = 0;
    const maxAttempts = 5;

    const gameCarImage = document.getElementById('gameCarImage');
    const gameCarName = document.getElementById('gameCarName');
    const priceGuessInput = document.getElementById('priceGuess');
    const submitGuessButton = document.getElementById('submitGuess');
    const gameMessage = document.getElementById('gameMessage');
    const newGameButton = document.getElementById('newGameButton');

    function startGame() {
        attempts = 0;
        
        const randomIndex = Math.floor(Math.random() * carsForGame.length);
        currentCar = carsForGame[randomIndex];

        gameCarImage.src = currentCar.image;
        gameCarName.textContent = currentCar.name;
        priceGuessInput.value = '';
        gameMessage.textContent = '¡Adivina el precio!';
        gameMessage.className = 'game-message';
        submitGuessButton.disabled = false;
        priceGuessInput.disabled = false;
        newGameButton.classList.add('hidden');
    }

    function checkGuess() {
        const userGuess = parseInt(priceGuessInput.value);

        if (isNaN(userGuess)) {
            gameMessage.textContent = 'Por favor, ingresa un número válido.';
            gameMessage.className = 'game-message error';
            return;
        }

        attempts++;

        if (userGuess === currentCar.price) {
            gameMessage.textContent = `¡Felicidades! Adivinaste el precio correcto de $${currentCar.price.toLocaleString()} en ${attempts} intentos.`;
            gameMessage.className = 'game-message correct';
            submitGuessButton.disabled = true;
            priceGuessInput.disabled = true;
            newGameButton.classList.remove('hidden');
        } else if (attempts >= maxAttempts) {
            gameMessage.textContent = `¡Se acabaron los intentos! El precio correcto era $${currentCar.price.toLocaleString()}.`;
            gameMessage.className = 'game-message error';
            submitGuessButton.disabled = true;
            priceGuessInput.disabled = true;
            newGameButton.classList.remove('hidden');
        } else if (userGuess < currentCar.price) {
            gameMessage.textContent = `Demasiado bajo. Intenta de nuevo. Intentos restantes: ${maxAttempts - attempts}`;
            gameMessage.className = 'game-message too-low';
        } else {
            gameMessage.textContent = `Demasiado alto. Intenta de nuevo. Intentos restantes: ${maxAttempts - attempts}`;
            gameMessage.className = 'game-message too-high';
        }
    }

    submitGuessButton.addEventListener('click', checkGuess);
    priceGuessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
    newGameButton.addEventListener('click', startGame);

   
    startGame();
});