import PlayerControl from "./controls/playerControl"
import SidesControl from "./controls/sidesControl"
import WsControl from "./controls/wsControl"
import Player from "./player"

export default class Game {
  constructor(canvasSettings) {
    this.player1
    this.player2
    this.playerControl
    this.playerSide

    this.canvasSettings = canvasSettings
    this.sidesControl = new SidesControl(this.getPlayer1, this.getPlayer2)
    this.wsControl = new WsControl(this.sidesControl.button1, this.sidesControl.button2, this.canvasSettings, this.playerSide)
  }

  update() {
    this.updateWsPlayer()
    console.log(this.detectCollision())

    if(this.player1 && this.playerControl) {
      this.player1.update()
      this.playerControl.updateVelocity()
      this.wsControl.socket.emit('move', {position: this.player1.position, side: this.playerSide})
    }

    if(this.player2) {
      this.player2.update()
    }

    // spec mod
    if(this.player1 && !this.playerControl) {
      this.player1.update()
    }
  }

  updateWsPlayer() {
    const position = this.wsControl.position
    this.removeDisconnectedPlayer(position)

    if(position) {
      this.player2 = new Player({
        position: position.position, 
        canvasSettings: this.canvasSettings, 
        velocity: {
          x: 0,
          y: 0,
        },
        width: 50,
        height: 150,
      }) 
      
      //for spec (2 sides full)
      if(this.playerSide) return
      if(position.side === 'left') {
        if(!this.player1) {
          this.player1 = new Player({
            position: position.position, 
            canvasSettings: this.canvasSettings, 
            velocity: {
              x: 0,
              y: 0,
            },
            width: 50,
            height: 150,
          }) 
        } else {
          this.player1.position = position.position
        }
        
      }
      if(position.side === 'right') {
        if(!this.player2) {
          this.player2 = new Player({
            position: position.position, 
            canvasSettings: this.canvasSettings, 
            velocity: {
              x: 0,
              y: 0,
            },
            width: 50,
            height: 150,
          }) 
        } else {
          this.player2.position = position.position
        }
      }
    }
  }

  removeDisconnectedPlayer(position) {
    if(!(position && this.player2)) {
      this.player2 = null
      if(!this.playerSide) {
        this.player1 = null
      }
    }
  }

  getPlayer1 = () => {
    this.wsControl.socket.emit('selectSide', {side: 'left'})
    this.playerSide = 'left'
    this.player1 = new Player({
      position: {x: 100, y: 0}, 
      canvasSettings: this.canvasSettings, 
      velocity: {
        x: 0,
        y: 0,
      },
      width: 50,
      height: 150,
    })
    this.playerControl = new PlayerControl(this.player1)
  }
  getPlayer2 = () => {
    this.wsControl.socket.emit('selectSide', {side: 'right'})
    this.playerSide = 'right'
    this.player1 = new Player({
      position: {x: 900, y: 0}, 
      canvasSettings: this.canvasSettings, 
      velocity: {
        x: 0,
        y: 0,
      },
      width: 50,
      height: 150,
    })
    this.playerControl = new PlayerControl(this.player1)
  }

  detectCollision() {
    if(this.player1 && this.player2 && this.playerSide) {
      const dx = Math.abs((this.player1.position.x + this.player1.width * 0.5) - (this.player2.position.x + this.player2.width * 0.5))
      const dy = Math.abs((this.player1.position.y + this.player1.height * 0.5) - (this.player2.position.y + this.player2.height * 0.5))
      const h = Math.sqrt(dx ** 2 + dy ** 2)
      return (h < this.player1.height * .5 + this.player2.height * .5)
    }
    
  }
}