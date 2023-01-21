import '../styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import PlayerControl from './components/controls/playerControl'
import Sprite from './components/sprite'

const canvasSettings = new CanvasSettings(1024, 576, 'canvas')
const playerId = Date.now()

const button1 = document.querySelector('.player1')
const button2 = document.querySelector('.player2')

const ws = new WebSocket('ws://localhost:5500/connect')

const player = new Sprite({
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


let playerControl
let choosePlayer 
let wsPlayer
let side 

ws.onopen = (e) => {
  ws.send(JSON.stringify({
    method: 'connect',
    playerId
  }))
}
ws.onmessage = (e) => {
  if(typeof e.data === 'string') {
    const msg = JSON.parse(e.data)
    if(msg.method === 'move') {
      if(msg.side === 'left') {
        player.position = msg.position
      } else {
        player2.position = msg.position
      }
    }
  }
}
ws.onerror = (e) => {
  // console.log(e)
}



button1.addEventListener('click', () => {
  playerControl = new PlayerControl(player)
  wsPlayer = player2
  choosePlayer = player
  side = 'left'

  ws.send(JSON.stringify({
    method: 'choseSide',
    playerId,
    side: 'left'
  }))
})
button2.addEventListener('click', () => {
  playerControl = new PlayerControl(player2)
  wsPlayer = player
  choosePlayer = player2
  side = 'right'
  ws.send(JSON.stringify({
    method: 'choseSide',
    playerId,
    side: 'right'
  }))
})

function animate() {
  canvasSettings.clearCanvas()
  if(choosePlayer) {
    choosePlayer.update()
  }
  if(wsPlayer) {
    wsPlayer.update()
  }
  

  if(playerControl) {
    playerControl.updateVelocity()
  }

  if(ws.readyState === 1 && choosePlayer) {
    ws.send(JSON.stringify({
      method: 'move',
      playerId: playerId,
      playerPosition: choosePlayer.position,
      side
    }))
  }
  requestAnimationFrame(animate)
}
animate()
