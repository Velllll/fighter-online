import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import Player2Control from './components/controls/player2Control'
import PlayerControl from './components/controls/playerControl'
import Sprite from './components/sprite'

const canvasSettings = new CanvasSettings(1024, 576, 'canvas')

const player = new Sprite({
  position: {x: 0, y: 0}, 
  canvasSettings, 
  velocity: {
    x: 0,
    y: 0,
  },
})
const playerControl = new PlayerControl(player)

const player2 = new Sprite({
  position: {x: 400, y: 50}, 
  canvasSettings, 
  velocity: {
    x: 0,
    y: 0,
  },
})
const player2Control = new Player2Control(player2)

function animate() {
  canvasSettings.clearCanvas()
  player.update()
  playerControl.updateVelocity()
  player2.update()
  player2Control.updateVelocity()

  requestAnimationFrame(animate)
}
animate()
