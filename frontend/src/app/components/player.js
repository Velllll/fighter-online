export default class Player {
  gravity = .7

  canAttack = true
  isAttacking = false

  health = 100

  socket 

  frame = 0
  frameCount = 0
  frameSpeed = 5

  scale = 2

  lastPositionX


  constructor({position, canvasSettings, velocity, width, height, playerSide, playerStates, ground = 388}) {
    this.position = position
    this.canvasSettings = canvasSettings
    this.velocity = velocity
    this.height = height
    this.width = width
    this.playerStates = playerStates
    this.playerSide = playerSide
    this.ground = ground

    this.state = this.playerStates.run

  }

  update() {
    this.updatePlayerStateImage()
    this.draw()
    this.updatePosition()
    this.updateFrame()
    this.setBorders()
  }

  draw() {
    this.canvasSettings.ctx.beginPath();
    this.canvasSettings.ctx.arc(this.position.x + this.state.width, this.position.y + this.state.height, this.height * .65, 0, 2 * Math.PI)
    this.canvasSettings.ctx.stroke();

    this.canvasSettings.ctx.drawImage(
      this.state.image,
      this.frame * this.state.width,
      0,
      this.state.width,
      this.state.height,
      this.position.x,
      this.position.y,
      this.state.width * this.scale,
      this.state.height * this.scale
    )
  }

  updatePosition() {
    this.position.y += this.velocity.y
    this.lastPositionX = this.position.x
    this.position.x += this.velocity.x
  }

  setBorders() {
    if(this.position.y + this.height + this.velocity.y >= this.ground) {
      this.velocity.y = 0
      this.position.y = this.ground - this.height
    } else {
      this.velocity.y += this.gravity
    }

    if(this.position.y < -100) {
      this.position.y = 0
      this.velocity.y = 0
    }   

    if(this.position.x <= -140) {
      this.position.x = -140
    }
    if(this.position.x + this.width > this.canvasSettings.width - 180) {
      this.position.x = this.canvasSettings.width - this.width - 180
    }
  }

  onGround() {
    return (this.position.y + this.height === this.ground)
  }

  attack(collision) {
    if(this.canAttack) {
      this.hit(collision)
      this.setAttackTimeout()
    }
  }

  hit(collision) {
    if(this.socket) {
      this.animateAttack()
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
    this.isAttacking = true
    this.state = this.playerStates.attack
    setTimeout(() => {
      this.isAttacking = false
    }, 400)
  }

  disableAttack(sec) {
    this.canAttack = false
    setTimeout(() => {
      this.canAttack = true
    }, sec)
  }

  updateFrame() {
    if(this.frameCount % this.frameSpeed === 0) this.frame++
    if(this.frame > this.state.frames) this.frame = 0
    this.frameCount++
  }

  updatePlayerStateImage() {
    if(this.lastPositionX === this.position.x && this.onGround() && !this.isAttacking) {
      this.state = this.playerStates.idle
    } 
    if(this.onGround() && this.lastPositionX !== this.position.x && !this.isAttacking) {
      this.state = this.playerStates.run
    }
    if(!this.onGround() && !this.isAttacking) {
      this.state = this.playerStates.jump
    }
  }
}