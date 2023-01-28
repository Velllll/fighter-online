export default class Player {
  gravity = .7
  ground = 480

  canAttack = true
  health = 100

  socket 

  constructor({position, canvasSettings, velocity, width, height, playerSide, playerStates}) {
    this.position = position
    this.canvasSettings = canvasSettings
    this.velocity = velocity
    this.height = height
    this.width = width
    this.playerStates = playerStates
    this.playerSide = playerSide
  }

  update() {
    this.draw()
    this.updatePosition()
    this.setBorders()
  }

  draw() {
    this.canvasSettings.ctx.fillStyle = 'red'
    // this.canvasSettings.ctx.beginPath();
    // this.canvasSettings.ctx.arc(this.position.x + this.width * 0.5, this.position.y + this.height * 0.5, this.height * .5, 0, 2 * Math.PI)
    // this.canvasSettings.ctx.stroke();

    this.canvasSettings.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  updatePosition() {
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }

  setBorders() {
    if(this.position.y + this.height + this.velocity.y >= this.ground) {
      this.velocity.y = 0
      this.position.y = this.ground - this.height
    } else {
      this.velocity.y += this.gravity
    }

    if(this.position.y < 0) {
      this.position.y = 0
      this.velocity.y = 0
    }   

    if(this.position.x <= 0) {
      this.position.x = 0
    }
    if(this.position.x + this.width > this.canvasSettings.width) {
      this.position.x = this.canvasSettings.width - this.width
    }
  }

  onGround() {
    return (this.position.y + this.height + this.velocity.y === this.ground)
  }

  attack(collision) {
    if(this.canAttack) {
      this.hit(collision)
      this.setAttackTimeout()
    }
  }

  hit(collision) {
    if(this.socket) {
      this.socket.emit('attack', {
        attack: true,
        hit: collision
      })
    }
  }

  setAttackTimeout() {
    if(this.playerSide === 'left') {
      let timeForNextAttack = this.position.x * 1.6
      if(timeForNextAttack < 300) timeForNextAttack = 300
      this.disableAttack(timeForNextAttack)
    } else {
      let timeForNextAttack = (this.canvasSettings.width - this.position.x - this.width) * 1.6
      if(timeForNextAttack < 300) timeForNextAttack = 300
      this.disableAttack(timeForNextAttack)
    }
  }

  animateAttack() {
    console.log('attack animation')
  }

  disableAttack(sec) {
    this.canAttack = false
    setTimeout(() => {
      this.canAttack = true
    }, sec)
  }
}