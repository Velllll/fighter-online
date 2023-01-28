import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import Game from './components/game';


const canvasSettings = new CanvasSettings(1024, 576, 'canvas')
let game = new Game(canvasSettings)

function animate() {
  canvasSettings.clearCanvas()
  if(game) {
    game.update()
  }

  requestAnimationFrame(animate)
}
animate()
