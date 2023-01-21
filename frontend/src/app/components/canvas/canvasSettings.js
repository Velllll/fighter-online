export default class CanvasSettings {
  constructor(width, height, canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.width = width
    this.height = height
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.ctx = canvas.getContext('2d')
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}