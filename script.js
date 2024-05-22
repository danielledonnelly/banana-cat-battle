let bananaCatHP = 20;
let elGadoHP = 20;

function updateHP() {
    document.getElementById('bananaCatHP').innerText = bananaCatHP;
    document.getElementById('elGadoHP').innerText = elGadoHP;
}

function showCryingGif() {
    const cryingGif = document.getElementById('cryingGif');
    cryingGif.style.display = 'block';
    setTimeout(() => {
        cryingGif.style.display = 'none';
    }, 3000); // Display the GIF for 3 seconds
}

function performAction(action) {
    let message = '';
    if (bananaCatHP <= 0 || elGadoHP <= 0) {
        return;
    }

    switch(action) {
        case 'cry':
            message = 'Banana Cat cries, reducing El Gado\'s attack!';
            showCryingGif();
            // Implement logic to reduce El Gado's attack
            break;
        case 'throwFish':
            elGadoHP -= 3;
            message = 'Banana Cat throws a fish, dealing 3 damage to El Gado!';
            break;
        case 'zoomies':
            message = 'Banana Cat zoomies, increasing dodge chance!';
            // Implement logic to increase dodge chance
            break;
        case 'meow':
            bananaCatHP += 3;
            if (bananaCatHP > 20) bananaCatHP = 20;  // Cap HP at 20
            message = 'Banana Cat meows, healing 3 HP!';
            break;
    }

    updateHP();
    document.getElementById('message').innerText = message;

    if (elGadoHP <= 0) {
        document.getElementById('message').innerText = 'Banana Cat wins!';
        return;
    }

    setTimeout(enemyTurn, 1000);
}

function enemyTurn() {
    let actions = ['scratch', 'bite', 'taunt'];
    let action = actions[Math.floor(Math.random() * actions.length)];
    let message = '';

    switch(action) {
        case 'scratch':
            bananaCatHP -= 3;
            message = 'El Gado scratches, dealing 3 damage to Banana Cat!';
            break;
        case 'bite':
            bananaCatHP -= 4;
            message = 'El Gado bites, dealing 4 damage to Banana Cat!';
            break;
        case 'taunt':
            message = 'El Gado taunts, reducing Banana Cat\'s morale!';
            // Implement logic to reduce morale
            break;
    }

    updateHP();
    document.getElementById('message').innerText = message;

    if (bananaCatHP <= 0) {
        document.getElementById('message').innerText = 'El Gado wins!';
    }
}

updateHP();
