car = null;
count = 0;
var keyMap = {};
var hazards = [];

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    car = new Car(canvas.width / 2 - 5, canvas.height / 2 - 10, 20, 40);
    // carX[0] = new Hazard(car.x, car.y, 0);
    car.show(context);
    
    // Listen for key events and passes the key to its corresponding function
    window.addEventListener("keydown", keydown_handler, false);
    window.addEventListener("keyup", keyup_handler, false);
   
    // This function is called every 30 milliseconds
    var moveInterval = setInterval(function () {
        
        // If only the W key is being pressed, move up
        if (keyMap[87] && !keyMap[83]) {
            car.gas(-1, !!keyMap[32]);

        // If only the S key is being pressed, move down
        } else if (!keyMap[87] && keyMap[83]) {
            car.gas(1, !!keyMap[32]);

        // Otherwise release the gas
        } else {
            car.gas(0, !!keyMap[32]);
        }

        // If only the A key is being pressed, turn left
        if (keyMap[65] && !keyMap[68]) {
            car.turn(-1);

        // If only the D key is being pressed, turn right
        } else if (!keyMap[65] && keyMap[68]) {
            car.turn(1);
        }


        if (collisionDetection()) {
            document.getElementById("collision").innerHTML = "";
        } else {
            document.getElementById("collision").innerHTML = "not";
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
    
    // Display everything
    // this.autoPilot();
    car.move();
    car.show(context);
    showHazards(context);
}

function showHazards(ctx) {
    totalHazards = document.getElementById("hazards").value;
    canvasSize = document.getElementById("canvas").width;

    if (totalHazards > hazards.length) {
        for (i = totalHazards - hazards.length; i > 0; i--) {
            hazards.push(new Hazard(Math.random() * canvasSize, Math.random() * canvasSize, Math.random() * 360, "purple"));
        }
    } else if (hazards.length > totalHazards) {
        for (i = hazards.length - totalHazards; i > 0; i--) {
            hazards.pop();
        }
    }
    if (totalHazards > 0 && hazards.length == totalHazards) {
        for (i = 0; i < totalHazards; i++) {
            hazards[i].show(ctx);
        }
    }
}

function keyup_handler(event) {
    switch(event.keyCode) {
        case 32:
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

function keydown_handler(event) {
    console.log(event.keyCode);
    switch(event.keyCode) {
        case 32:
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

function collisionDetection() {
    return car.collisionDetection(hazards);
}

// Wait until the window loads before starting the code
window.onload = init;