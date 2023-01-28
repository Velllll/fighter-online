export default class PlayerControl {
  keys = {
    a: {
      press: false,
    },
    d: {
      press: false,
    },
    w: {
      press: false,
    },
    space: {
      press: false
    }
  }
  lastKey

  constructor(player) {
    this.player = player
    this.addControls()
  }

  addControls() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'd':
          this.keys.d.press = true
          this.lastKey = 'd'
          break;
        case 'a':
          this.keys.a.press = true
          this.lastKey = 'a'
          break
        case 'w':
          this.keys.w.press = true
          break
        case ' ':
          this.keys.space.press = true
          break
      }
    })
    
    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'd':
          this.keys.d.press = false
          break;
        case 'a':
          this.keys.a.press = false
          break
        case 'w':
          this.keys.w.press = false
          break
        case ' ':
          this.keys.space.press = false
          break
      }
    })
  }

  updateVelocity() {
    if(this.keys.w.press && this.player.onGround()) {
      this.player.velocity.y = -20
    }
    if(this.keys.space.press) {
      this.player.attack()
    }
    if(this.keys.a.press && this.lastKey === 'a') {
      this.player.velocity.x = -8
    } else if (this.keys.d.press && this.lastKey === 'd') {
      this.player.velocity.x = 8
    } else {
      this.player.velocity.x = 0
    }
  }


}