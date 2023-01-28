import { io } from "socket.io-client";
export default class WsControl {

  constructor(button1, button2, canvasSettings) {
    this.button1 = button1
    this.button2 = button2
    this.canvasSettings = canvasSettings

    this.socket = io("ws://localhost:5500");

    this.position

    this.wsPlayer

    this.socket.on('connect', () => {
      console.log(this.socket.id)
    })
    this.socket.on('sidesStatus', s => {
      this.button1.disabled = s.left
      this.button2.disabled = s.right
      this.#setDisconnectedPlayer()
    })
    this.socket.on('playerMove', (position) => {
      if(this.wsPlayer) {
        this.wsPlayer.playerSide = position.side
      }
      this.position = position
    })
    this.socket.on('attack', (data) => {
      if(this.wsPlayer) {
        this.wsPlayer.animateAttack()
      }
    })
  }

  #setDisconnectedPlayer() {
    this.position = null
  }
}