import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import PlayerControl from './components/controls/playerControl'
import Sprite from './components/sprite'
import { io } from "socket.io-client";

const canvasSettings = new CanvasSettings(1024, 576, 'canvas')

const button1 = document.querySelector('.player1')
const button2 = document.querySelector('.player2')
button1.disabled = false
button2.disabled = false
const socket = io("ws://localhost:5500");

socket.on('connect', () => {
  console.log(socket.id)

})
socket.on('sidesStatus', m => {
  button1.disabled = m.left
  button2.disabled = m.right
})

const player1 = new Sprite({
  position: {x: 0, y: 0}, 
  canvasSettings, 
  velocity: {
    x: 0,
    y: 0,
  },
})

const player2 = new Sprite({
  position: {x: 400, y: 0}, 
  canvasSettings, 
  velocity: {
    x: 0,
    y: 0,
  },
})

button1.addEventListener('click', () => {
  socket.emit('selectSide', {side: 'left'})
})
button2.addEventListener('click', () => {
  socket.emit('selectSide', {side: 'right'})
})

function animate() {
  canvasSettings.clearCanvas()

  
  requestAnimationFrame(animate)
}
animate()
