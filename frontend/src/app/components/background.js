export default class Background {
  frame = 0
  frameSpeed = 6
  frameCount = 0

  constructor(canvasSettings, width, height, imageSrc, maxFrames, x = 0, y = 0, scale = 1) {
    this.canvasSettings = canvasSettings
    this.width = width
    this.height = height
    this.maxFrames = maxFrames
    this.image = new Image()
    this.image.src = imageSrc

    this.scale = scale
    this.x = x
    this.y = y
  }

  update() {
    this.draw()
    this.updateFrame()
  }

  draw() {
    this.canvasSettings.ctx.drawImage(
      this.image,
      this.frame * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale,
    )
  }

  updateFrame() {
    if(this.frameCount % this.frameSpeed === 0) this.frame++
    if(this.frame >= this.maxFrames) this.frame = 0
    this.frameCount++
  }


}