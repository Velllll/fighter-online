export default class Player2Control {

  keys = {
    ArrowLeft: {
      press: false,
    },
    ArrowRight: {
      press: false,
    },
    ArrowUp: {
      press: false,
    },
  }
  lastKey

  constructor(player2) {
    this.player2 = player2
    this.addControls()
  }

  addControls() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.keys.ArrowRight.press = true
          this.lastKey = 'ArrowRight'
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.press = true
          this.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          this.keys.ArrowUp.press = true
          break
      }
    })
    
    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.keys.ArrowRight.press = false
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.press = false
          break
        case 'ArrowUp':
          this.keys.ArrowUp.press = false
          break
      }
    })
  }

  updateVelocity() {
    if(this.keys.ArrowUp.press) {
      this.player2.velocity.y = -15
    }
    if(this.keys.ArrowLeft.press && this.lastKey === 'ArrowLeft') {
      this.player2.velocity.x = -4
    } else if (this.keys.ArrowRight.press && this.lastKey === 'ArrowRight') {
      this.player2.velocity.x = 4
    } else {
      this.player2.velocity.x = 0
    }
    
  }


}