import Background from "./background"
import PlayerControl from "./controls/playerControl"
import SidesControl from "./controls/sidesControl"
import WsControl from "./controls/wsControl"
import Player from "./player"
import background from '../../assets/background.png'
import backgroundHouse from '../../assets/shop.png'
import playerStates from './playerSprites'

export default class Game {
  constructor(canvasSettings) {
    this.canvasSettings = canvasSettings

    this.player
    this.wsPlayer
    this.playerControl
    this.playerSide
    
    this.background = new Background(this.canvasSettings, 1024, 576, background, 0)
    this.backgroundShop = new Background(this.canvasSettings, 118, 128, backgroundHouse, 5, 700, 224, 2)
    this.sidesControl = new SidesControl(this.getPlayerLeft, this.getPlayerRight)
    this.wsControl = new WsControl(this.sidesControl.button1, this.sidesControl.button2, this.canvasSettings)
  }

  update() {
    this.background.update()
    this.backgroundShop.update()

    this.updatePlayer()
    this.updateWsPlayer()
    this.setBordersBetweenPlayers()

    if(this.player && this.wsPlayer) {
      this.playerControl.collide = this.detectCollision()
    }

    //set socket to player class
    if(this.wsControl.socket.connected && this.player && !this.player.socket) {
      this.player.socket = this.wsControl.socket
    }
    //set wsPlayer to wsControllClass
    if(this.wsPlayer && this.wsControl) {
      this.wsControl.wsPlayer = this.wsPlayer
    }
  }

  updateWsPlayer() {
    const position = this.wsControl.position
    this.removeDisconnectedPlayer(position)
    if(position && !this.wsPlayer) {
      this.wsPlayer = new Player({
        position: position.position, 
        canvasSettings: this.canvasSettings, 
        velocity: {
          x: 0,
          y: 0,
        },
        width: 50,
        height: 150,
        playerSide: this.wsControl.wsPlayerSide,
        playerStates: this.wsControl.wsPlayerSide === 'left' ? playerStates.left : playerStates.right,
        ground: this.wsControl.wsPlayerSide === 'left' ? 388 : 376
      }) 
    }
    
    if(position && this.wsPlayer) {
      this.wsPlayer.position = position.position
      this.wsPlayer.playerSide = this.wsControl.wsPlayerSide,
      this.wsPlayer.playerStates = this.wsControl.wsPlayerSide === 'left' ? playerStates.left : playerStates.right,
      this.wsPlayer.ground = this.wsControl.wsPlayerSide === 'left' ? 388 : 376
      this.wsPlayer.update()
    }
  }

  updatePlayer() {
    if(this.player && this.playerControl) {
      this.player.update()
      this.playerControl.updateVelocity()
      this.wsControl.socket.emit('move', {position: this.player.position, side: this.playerSide})
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
      playerSide: this.playerSide,
      playerStates: playerStates.left
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
      playerSide: this.playerSide,
      playerStates: playerStates.right,
      ground: 376
    })
    this.playerControl = new PlayerControl(this.player)
  }

  detectCollision() {
    if(this.player && this.wsPlayer) {
      const dx = Math.abs((this.player.position.x + this.player.state.width * 0.65) - (this.wsPlayer.position.x + this.wsPlayer.state.width * 0.65))
      const dy = Math.abs((this.player.position.y + this.player.state.height * 0.65) - (this.wsPlayer.position.y + this.wsPlayer.state.height * 0.65))
      const h = Math.sqrt(dx ** 2 + dy ** 2)
      return (h < this.player.state.height * .5 + this.wsPlayer.state.height * .5)
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