class Hazard {
    constructor(x, y, angle, defaultColor) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.height = 5;
        this.width = 5;
        this.defaultColor = defaultColor;
        this.color = defaultColor;
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

    collision(booleo) {
        if (booleo) {
            this.color = "red";
        } else {
            this.color = this.defaultColor;
        }
    }

    minX() {
      // Calculate the X-coordinate of every corner and return the lowest
      return Math.min(
        this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2
      );
  }

  maxX() {
      // Calculate the X-coordinate of every corner and return the highest
      return Math.max(
        this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x + this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.height * Math.sin( this.angle * Math.PI / 180 ) / 2,
        this.x - this.width * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.height * Math.sin( this.angle * Math.PI / 180 ) / 2
      );
  }
    
      minY() {
          // Calculate the Y-coordinate of every corner and return the lowest
          return Math.min(
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
          );
      }
    
      maxY() {
          // Calculate the Y-coordinate of every corner and return the highest
          return Math.max(
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y + this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 + this.width * Math.sin( this.angle * Math.PI / 180 ) / 2,
            this.y - this.height * Math.cos( this.angle * Math.PI / 180 ) / 2 - this.width * Math.sin( this.angle * Math.PI / 180 ) / 2
          );
    }
}