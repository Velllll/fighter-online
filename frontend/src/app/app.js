import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import PlayerControl from './components/controls/playerControl'
import Sprite from './components/sprite'
import { io } from "socket.io-client";

let player1
let player2
let playerControl

const canvasSettings = new CanvasSettings(1024, 576, 'canvas')

const button1 = document.querySelector('.player1')
const button2 = document.querySelector('.player2')
button1.disabled = false
button2.disabled = false
const socket = io("ws://localhost:5500");

socket.on('connect', () => {
  console.log(socket.id)
})
socket.on('sidesStatus', s => {
  button1.disabled = s.left
  button2.disabled = s.right
  player2 = null
})
socket.on('playerMove', (position) => {
  player2 = new Sprite({
    position, 
    canvasSettings, 
    velocity: {
      x: 0,
      y: 0,
    },
  }) 
})

button1.addEventListener('click', () => {
  socket.emit('selectSide', {side: 'left'})
  player1 = new Sprite({
    position: {x: 100, y: 0}, 
    canvasSettings, 
    velocity: {
      x: 0,
      y: 0,
    },
  })
  playerControl = new PlayerControl(player1)

})
button2.addEventListener('click', () => {
  socket.emit('selectSide', {side: 'right'})
  player1 = new Sprite({
    position: {x: 900, y: 0}, 
    canvasSettings, 
    velocity: {
      x: 0,
      y: 0,
    },
  })
  playerControl = new PlayerControl(player1)
})

function animate() {
  canvasSettings.clearCanvas()
  if(player1 && playerControl) {
    player1.update()
    playerControl.updateVelocity()
    socket.emit('move', player1.position)
  }
  if(player2) {
    player2.update()
  }
  
  requestAnimationFrame(animate)
}
animate()
