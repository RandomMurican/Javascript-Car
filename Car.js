class Car {
  constructor(x, y, width, height) {
      this.x = document.getElementById("canvas").width / 2 - (width / 2);
      this.y = document.getElementById("canvas").height / 2 - (height / 2);
      this.width = width;
      this.height = height;
      this.angle = 0;
      this.velocity = 0;
      this.moving = false;
      this.maxSpeed = 20;
      this.acceleration = 3;
  }

  show(ctx) {
      // Don't ask me how this works just yet, but one day I'll hopefully
      // come back later and learn it better
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.restore();
  }

  gas(direction) {
    // Direction is an integer with 3 types:

    // 0 means we stopped moving
    if (direction == 0) {
        this.moving = false;
    
    // > 0 means we're moving forward
    } else if (direction > 0) {
        this.moving = true;
        this.velocity -= this.acceleration; // negative is up

    // < 0 means we're moving backward
    } else if (direction < 0) {
        this.moving = true;
        this.velocity += this.acceleration; // positive is down
    }

    // Check that the current velocity is not above the max
    if (this.velocity > this.maxSpeed) {
        this.velocity = this.maxSpeed;
    } else if (this.velocity < -this.maxSpeed) {
        this.velocity = -this.maxSpeed;
    }
  }

  turn(direction) {
      // If direction is greater than 0, turn right
      if (direction > 0) {
          this.angle += 15;
      // Otherwise turn left
      } else {
          this.angle -= 15;
      }

      // Make the angle pretty by keeping it between 0 and 360
      if (this.angle >= 360) {
          this.angle = (this.angle % 360);
      }
      if (this.angle < 0) {
          this.angle = (360 % this.angle) + 360;
      }

      // Let the user know what angle we're face
      document.getElementById("angle").innerHTML = this.angle;
  }

  move() {
      // Get the size of the canvas
      var screenSize = document.getElementById("canvas").width;

      // Move the car appropriately depending on what direction its facing
      this.y += ( this.velocity * Math.cos(this.angle * Math.PI / 180) );
      this.x -= ( this.velocity * Math.sin(this.angle * Math.PI / 180) );

      // Keep the car on screen
      // TODO: Draw 2 cars to keep the transition fluid
      if (this.y < 0) {
          this.y = this.y + screenSize;
      }
      if (this.x > screenSize) {
          this.x = this.x - screenSize;
      }
      if (this.x < 0) {
          this.x = this.x + screenSize;
      }
      if (this.y > screenSize) {
          this.y = this.y - screenSize;
      }
      
      // Slow the car down if the gas isn't pressed
      if (!this.moving) {
          if (this.velocity > 1 || this.velocity < -1) {
              this.velocity = Math.round(this.velocity * 85) / 100;
          } else {
              this.velocity = 0;
          }
      }

      // Let the user know how fast they're going
      document.getElementById("speed").innerHTML = Math.abs(this.velocity);
  }
}