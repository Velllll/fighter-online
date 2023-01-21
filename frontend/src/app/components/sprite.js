export default class Sprite {
  gravity = .7

  constructor({position, canvasSettings, velocity}) {
    this.position = position
    this.canvasSettings = canvasSettings
    this.velocity = velocity
    this.height = 150
    this.width = 50
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }

  draw() {
    this.canvasSettings.ctx.fillStyle = 'red'
    this.canvasSettings.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    if(this.position.y + this.height + this.velocity.y >= this.canvasSettings.height) {
      this.velocity.y = 0
      this.position.y = this.canvasSettings.height - this.height
    } else {
      this.velocity.y += this.gravity
    }
  }
}