import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import PlayerControl from './components/controls/playerControl'
import Sprite from './components/sprite'
import { io } from "socket.io-client";

let player1
let player2
let playerControl
let playerSide
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
  if(!playerSide) {
    player1 = null
  }
})
socket.on('playerMove', (position) => {
  player2 = new Sprite({
    position: position.position, 
    canvasSettings, 
    velocity: {
      x: 0,
      y: 0,
    },
  }) 
  



  if(!playerSide) {
    if(position.side === 'left') {
      if(!player1) {
        player1 = new Sprite({
          position: position.position, 
          canvasSettings, 
          velocity: {
            x: 0,
            y: 0,
          },
        }) 
      } else {
        player1.position = position.position
      }
      
    }
    if(position.side === 'right') {
      if(!player2) {
        player2 = new Sprite({
          position: position.position, 
          canvasSettings, 
          velocity: {
            x: 0,
            y: 0,
          },
        }) 
      } else {
        player2.position = position.position
      }
      
    }
  }
})

function renderSpecIfPlayerSideEmpty(position) {
  
}

button1.addEventListener('click', () => {
  socket.emit('selectSide', {side: 'left'})
  playerSide = 'left'
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
  playerSide = 'right'
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
    socket.emit('move', {position: player1.position, side: playerSide})
  }
  //spec mod
  if(player2) {
    player2.update()
  }
  if(player1 && !playerControl) {
    player1.update()
  }
  
  requestAnimationFrame(animate)
}
animate()
