export default class Player {
  gravity = .7
  ground = 480

  constructor({position, canvasSettings, velocity, width, height}) {
    this.position = position
    this.canvasSettings = canvasSettings
    this.velocity = velocity
    this.height = height
    this.width = width
  }

  update() {
    this.draw()
    this.updatePosition()
    this.setBorders()
  }

  draw() {
    this.canvasSettings.ctx.fillStyle = 'red'
    this.canvasSettings.ctx.beginPath();
    this.canvasSettings.ctx.arc(this.position.x + this.width * 0.5, this.position.y + this.height * 0.5, this.height * .5, 0, 2 * Math.PI)
    this.canvasSettings.ctx.stroke();
    this.canvasSettings.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  updatePosition() {
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }

  setBorders() {
    if(this.position.y + this.height + this.velocity.y >= this.ground) {
      this.velocity.y = 0
      this.position.y = this.ground - this.height
    } else {
      this.velocity.y += this.gravity
    }

    if(this.position.y < 0) {
      this.position.y = 0
      this.velocity.y = 0
    }   

    if(this.position.x <= 0) {
      this.position.x = 0
    }
    if(this.position.x + this.width > this.canvasSettings.width) {
      this.position.x = this.canvasSettings.width - this.width
    }
  }

  onGround() {
    return (this.position.y + this.height + this.velocity.y === this.ground)
  }

  attack() {
    console.log('attack')
  }
}