import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import Game from './components/game';


const canvasSettings = new CanvasSettings(1024, 576, 'canvas')
const game = new Game(canvasSettings)

function animate() {
  canvasSettings.clearCanvas()
  game.update()
  
  requestAnimationFrame(animate)
}
animate()
