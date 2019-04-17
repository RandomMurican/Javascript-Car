class Car {
  constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.angle = 0;
      this.velocity = 0;
      this.moving = false;
      this.turbo = 5;
      this.maxSpeed = 10; // 15
      this.acceleration = 2; // 3
      this.color = "green";
  }

  show(ctx) {
      // Don't ask me how this works just yet, but one day I'll hopefully
      // come back later and learn it better
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
  }

  gas(direction, turbo) {
    // Direction is an integer with 3 types:
    // Turbo is true or false

    // 0 means we stopped moving
    if (direction == 0) {
        this.moving = false;
    } else {
        this.moving = true;

        if (turbo && this.moving) {
            // If too fast
            if (this.velocity >= this.maxSpeed * this.turbo) {
                this.velocity = this.maxSpeed * this.turbo;
            // Or too slow
            } else if (this.velocity <= -this.maxSpeed * this.turbo) {
                this.velocity = -this.maxSpeed * this.turbo;
            } else {
                if (direction > 0) {
                    this.velocity += this.acceleration;
                } else {
                    this.velocity -= this.acceleration;
                }
            }
        } else { // Not using turbo
            // If too fast
            if (this.velocity >= this.maxSpeed) {
                this.velocity -= this.acceleration;
                if (this.velocity < this.maxSpeed) {
                    this.velocity = this.maxSpeed;
                }
            // Or too slow
            } else if (this.velocity <= -this.maxSpeed) {
                this.velocity += this.acceleration;
                if (this.velocity > -this.maxSpeed) {
                    this.velocity = -this.maxSpeed;
                }
            } else {
                if (direction > 0) {
                    this.velocity += this.acceleration;
                } else {
                    this.velocity -= this.acceleration;
                }
            }
        }
    }
  }

  turn(direction) {
      // If direction is greater than 0, turn right
      if (direction > 0) {
          this.angle += 3;
      // Otherwise turn left
      } else {
          this.angle -= 3;
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

collisionDetection(hazards) {
    var collision = false;
    const corners = this.getCorners();
    for (let hazard of hazards) {
        if(this.angle >= 90 && this.angle < 270) {
            if (hazard.y <= (corners[1].y - corners[0].y) * (hazard.x - corners[0].x) / (corners[1].x - corners[0].x) + corners[0].y
             && hazard.y >= (corners[3].y - corners[2].y) * (hazard.x - corners[2].x) / (corners[3].x - corners[2].x) + corners[2].y
             && hazard.x <= (corners[2].x - corners[1].x) * (hazard.y - corners[1].y) / (corners[2].y - corners[1].y) + corners[1].x
             && hazard.x >= (corners[3].x - corners[0].x) * (hazard.y - corners[0].y) / (corners[3].y - corners[0].y) + corners[0].x) {
                hazard.collision(true);
                this.color = "red";
                collision = true;
            } else {
                hazard.collision(false);
            }
        } else {
            if (hazard.y <= (corners[1].y - corners[0].y) * (hazard.x - corners[0].x) / (corners[1].x - corners[0].x) + corners[0].y
             && hazard.y >= (corners[3].y - corners[2].y) * (hazard.x - corners[2].x) / (corners[3].x - corners[2].x) + corners[2].y
             && hazard.x >= (corners[2].x - corners[1].x) * (hazard.y - corners[1].y) / (corners[2].y - corners[1].y) + corners[1].x
             && hazard.x <= (corners[3].x - corners[0].x) * (hazard.y - corners[0].y) / (corners[3].y - corners[0].y) + corners[0].x) {
                hazard.collision(true);
                this.color = "red";
                collision = true;
            } else {
                hazard.collision(false);
            }
        }
    }
    if (collision) return true;
    console.log('no collision');
    this.color = "green";
    return false;
}

  pointCollisionDetection(point) {

      getCorners().forEach(point => {
          
      });
  }

    getCorners() {
        if (this.angle == 270) {
            return [
                this.getBackLeftCorner(),
                this.getFrontLeftCorner(),
                this.getFrontRightCorner(),
                this.getBackRightCorner()
            ];
        }
        if (this.angle == 90) {
            return [
                this.getBackRightCorner(),
                this.getFrontRightCorner(),
                this.getFrontLeftCorner(),
                this.getBackLeftCorner()
            ];
        }
        if (this.angle > 90 && this.angle < 270) {
            return [
                this.getFrontRightCorner(),
                this.getFrontLeftCorner(),
                this.getBackLeftCorner(),
                this.getBackRightCorner()
            ];
        }
        return [
            this.getBackRightCorner(),
            this.getBackLeftCorner(),
            this.getFrontLeftCorner(),
            this.getFrontRightCorner()
        ];
    }

    getFrontLeftCorner() {
        return new Point(
            this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
        );
    }

    getFrontRightCorner() {
      return new Point(
          this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
          this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
      );
    }

    getBackLeftCorner() {
        return new Point(
            this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
        );
    }

    getBackRightCorner() {
        return new Point(
            this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
        );
    }

  minX() {
    if (this.angle < 90) return this.getBackLeftCorner().x;
    if (this.angle < 180) return this.getBackRightCorner().x;
    if (this.angle < 270) return this.getFrontRightCorner().x;
    return this.getFrontLeftCorner().x;
  }

  maxX() {
    if (this.angle < 90) return this.getFrontRightCorner().x;
    if (this.angle < 180) return this.getFrontLeftCorner().x;
    if (this.angle < 270) return this.getBackLeftCorner().x;
    return this.getBackRightCorner().x;
  }

  minY() {
    if (this.angle < 90) return this.getBackRightCorner().y;
    if (this.angle < 180) return this.getFrontRightCorner().y;
    if (this.angle < 270) return this.getFrontLeftCorner().y;
    return this.getBackLeftCorner().y;
  }

  maxY() {
    if (this.angle < 90) return this.getFrontLeftCorner().y;
    if (this.angle < 180) return this.getBackLeftCorner().y;
    if (this.angle < 270) return this.getBackRightCorner().y;
    return this.getFrontRightCorner().y;
  }
}