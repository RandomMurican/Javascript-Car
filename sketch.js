car = null;
var keyMap = {};

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    car = new Car(0, 20, 10, 20);
    car.show(context);
    
    // Listen for key events and passes the key to its corresponding function
    window.addEventListener("keydown", keypress_handler, false);
    window.addEventListener("keyup", keyup_handler, false);
   
    // This function is called every 30 milliseconds
    var moveInterval = setInterval(function () {

        // If only the W key is being pressed, move up
        if (keyMap[87] && !keyMap[83]) {
            car.gas(-1);

        // If only the S key is being pressed, move down
        } else if (!keyMap[87] && keyMap[83]) {
            car.gas(1);

        // Otherwise release the gas
        } else {
            car.gas(0);
        }

        // If only the A key is being pressed, turn left
        if (keyMap[65] && !keyMap[68]) {
            car.turn(-1);

        // If only the D key is being pressed, turn right
        } else if (!keyMap[65] && keyMap[68]) {
            car.turn(1);
        }

        // Now that everything has moved,
        // draw everything on the screen
        draw();
    }, 30); /**/
}

function draw() {
    
    // get information about the canvas
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Do weird things so we can move and display everything
    context.save();
    car.move();
    car.show(context);
    context.restore();
}

function keyup_handler(event) {
    switch(event.keyCode) {
        case 65:
        case 68:
        case 83:
        case 87:
            // If the key is a specifc key, log it as let go
            keyMap[event.keyCode] = false;
            break;
        default:
            break;
    }
}


function keypress_handler(event) {
    switch(event.keyCode) {
        case 65:
        case 68:
        case 83:
        case 87:
            // If the key is a specifc key, log it as pressed
            keyMap[event.keyCode] = true;
            break;
        default:
            break;
    }
}

// Wait until the window loads before starting the code
window.onload = init;