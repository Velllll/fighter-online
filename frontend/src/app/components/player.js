export default class Player {
  gravity = .7

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
    this.canvasSettings.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  updatePosition() {
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }

  setBorders() {
    if(this.position.y + this.height + this.velocity.y >= this.canvasSettings.height) {
      this.velocity.y = 0
      this.position.y = this.canvasSettings.height - this.height
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
    return (this.position.y + this.height + this.velocity.y === this.canvasSettings.height)
  }

  attack() {
    console.log('attack')
  }
}