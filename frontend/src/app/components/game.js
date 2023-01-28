import Background from "./background"
import PlayerControl from "./controls/playerControl"
import SidesControl from "./controls/sidesControl"
import WsControl from "./controls/wsControl"
import Player from "./player"
import background from '../../assets/background.png'
import backgroundHouse from '../../assets/shop.png'

export default class Game {
  constructor(canvasSettings) {
    this.player
    this.wsPlayer
    this.playerControl
    this.playerSide

    this.canvasSettings = canvasSettings
    this.background = new Background(this.canvasSettings, 1024, 576, background, 0)
    this.backgroundShop = new Background(this.canvasSettings, 118, 128, backgroundHouse, 5, 700, 224, 2)
    this.sidesControl = new SidesControl(this.getPlayerLeft, this.getPlayerRight)
    this.wsControl = new WsControl(this.sidesControl.button1, this.sidesControl.button2, this.canvasSettings)
  }

  update() {
    this.background.update()
    this.backgroundShop.update()
    this.updateWsPlayer()

    if(this.player && this.playerControl) {
      this.player.update()
      this.playerControl.updateVelocity()
      this.wsControl.socket.emit('move', {position: this.player.position, side: this.playerSide})
    }
    this.setBordersBetweenPlayers()

    if(this.wsPlayer) {
      this.wsPlayer.update()
    }
  }

  updateWsPlayer() {
    const position = this.wsControl.position
    this.removeDisconnectedPlayer(position)

    if(position) {
      this.wsPlayer = new Player({
        position: position.position, 
        canvasSettings: this.canvasSettings, 
        velocity: {
          x: 0,
          y: 0,
        },
        width: 50,
        height: 150,
      }) 
    }
  }

  removeDisconnectedPlayer(position) {
    if(!(position && this.wsPlayer)) {
      this.wsPlayer = null
      if(!this.playerSide) {
        this.player = null
      }
    }
  }

  getPlayerLeft = () => {
    this.wsControl.socket.emit('selectSide', {side: 'left'})
    this.playerSide = 'left'
    this.player = new Player({
      position: {x: 100, y: 0}, 
      canvasSettings: this.canvasSettings, 
      velocity: {
        x: 0,
        y: 0,
      },
      width: 50,
      height: 150,
      playerSide: this.playerSide
    })
    this.playerControl = new PlayerControl(this.player)
  }
  getPlayerRight = () => {
    this.wsControl.socket.emit('selectSide', {side: 'right'})
    this.playerSide = 'right'
    this.player = new Player({
      position: {x: 900, y: 0}, 
      canvasSettings: this.canvasSettings, 
      velocity: {
        x: 0,
        y: 0,
      },
      width: 50,
      height: 150,
      playerSide: this.playerSide
    })
    this.playerControl = new PlayerControl(this.player)
  }

  detectCollision() {
    if(this.player1 && this.player2 && this.playerSide) {
      const dx = Math.abs((this.player1.position.x + this.player1.width * 0.5) - (this.player2.position.x + this.player2.width * 0.5))
      const dy = Math.abs((this.player1.position.y + this.player1.height * 0.5) - (this.player2.position.y + this.player2.height * 0.5))
      const h = Math.sqrt(dx ** 2 + dy ** 2)
      return (h < this.player1.height * .5 + this.player2.height * .5)
    }
  }

  //player can not go throw the other player
  setBordersBetweenPlayers() {
    if(this.player && this.wsPlayer) {
      if(this.playerSide === 'left' && this.player.position.x + this.player.width >= this.wsPlayer.position.x && this.player.velocity.x > 0) {
        this.player.velocity.x = 0
      }
      if(this.playerSide === 'right' && this.player.position.x <= this.wsPlayer.position.x + this.wsPlayer.width && this.player.velocity.x < 0) {
        this.player.velocity.x = 0
      }
    }
  }
}