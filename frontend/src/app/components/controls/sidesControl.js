export default class SidesControl {
  constructor(getPlayerLeft, getPlayerRight) {
    this.button1 = document.querySelector('.player1')
    this.button2 = document.querySelector('.player2')
    this.button1.disabled = false
    this.button2.disabled = false

    this.button1.addEventListener('click', getPlayerLeft)
    this.button2.addEventListener('click', getPlayerRight)
  }
}