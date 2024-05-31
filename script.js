function showGif(gifId, message, callback) {
    const bananaCatImg = document.getElementById('bananaCatImg');
    const gif = document.getElementById(gifId);
    const messageDiv = document.getElementById('message');
    
    // Set the message
    messageDiv.innerText = message;

    // Hide the original image
    bananaCatImg.style.visibility = 'hidden';
    // Show the gif
    gif.style.display = 'block';
    
    // Execute the callback function after 3 seconds
    setTimeout(() => {
        gif.style.display = 'none';
        bananaCatImg.style.visibility = 'visible';
        messageDiv.innerText = ''; // Clear the message
        if (callback) {
            callback(); // Execute the callback function
        }
    }, 3000);
}

function performAction(action) {
    let message = '';
    if (bananaCatHP <= 0 || elGatoHP <= 0) {
        return;
    }

    // Disable buttons during animation
    document.querySelectorAll('#actions button').forEach(button => button.disabled = true);

    switch(action) {
        case 'cry':
            message = 'Banana Cat cries, reducing El Gato\'s attack!';
            showGif('cryingGif', message, enemyTurn);
            // Implement logic to reduce El Gato's attack
            break;
        case 'throwFish':
            elGatoHP -= 3;
            message = 'Banana Cat throws a fish, dealing 3 damage to El Gato!';
            break;
        case 'zoomies':
            message = 'Banana Cat zoomies, increasing dodge chance!';
            showGif('zoomiesGif', message, enemyTurn);
            // Implement logic to increase dodge chance
            break;
        case 'meow':
            bananaCatHP += 3;
            if (bananaCatHP > 20) bananaCatHP = 20;  // Cap HP at 20
            message = 'Banana Cat meows, healing 3 HP!';
            showGif('meowGif', message, enemyTurn);
            break;
    }

    updateHP();

    if (elGatoHP <= 0) {
        document.getElementById('message').innerText = 'Banana Cat wins!';
        return;
    }
}

function enemyTurn() {
    let actions = ['scratch', 'bite', 'taunt'];
    let action = actions[Math.floor(Math.random() * actions.length)];
    let message = '';

    // Disable buttons during enemy's turn
    document.querySelectorAll('#actions button').forEach(button => button.disabled = true);

    switch(action) {
        case 'scratch':
            bananaCatHP -= 3;
            message = 'El Gato scratches, dealing 3 damage to Banana Cat!';
            showGif('cryingGif', message, () => {
                // Enable buttons after animation
                document.querySelectorAll('#actions button').forEach(button => button.disabled = false);
            });
            break;
        case 'bite':
            bananaCatHP -= 4;
            message = 'El Gato bites, dealing 4 damage to Banana Cat!';
            showGif('cryingGif', message, () => {
                // Enable buttons after animation
                document.querySelectorAll('#actions button').forEach(button => button.disabled = false);
            });
            break;
        case 'taunt':
            message = 'El Gato taunts, reducing Banana Cat\'s morale!';
            showGif('cryingGif', message, () => {
                // Enable buttons after animation
                document.querySelectorAll('#actions button').forEach(button => button.disabled = false);
            });
            // Implement logic to reduce morale
            break;
    }

    updateHP();
    document.getElementById('message').innerText = message;

    if (bananaCatHP <= 0) {
        document.getElementById('message').innerText = 'El Gato wins!';
    }
}
