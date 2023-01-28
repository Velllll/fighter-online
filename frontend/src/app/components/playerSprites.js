import attackL from '../../assets/leftPlayer/Attack2.png'
import idleL from '../../assets/leftPlayer/Idle.png'
import jumpL from '../../assets/leftPlayer/Jump.png'
import runL from '../../assets/leftPlayer/Run.png'
import takeHitL from '../../assets/leftPlayer/Take.png'

import attackR from '../../assets/rightPlayer/Attack1.png'
import idleR from '../../assets/rightPlayer/Idle.png'
import jumpR from '../../assets/rightPlayer/Jump.png'
import runR from '../../assets/rightPlayer/Run.png'
import takeHitR from '../../assets/rightPlayer/Take.png'

const leftPlayer = {
  attack: {
    image: new Image(),
    frames: 5,
    width: 200,
    height: 200,
  },
  idle: {
    image: new Image(),
    frames: 7,
    width: 200,
    height: 200,
  },
  jump: {
    image: new Image(),
    frames: 1,
    width: 200,
    height: 200,
  },
  run: {
    image: new Image(),
    frames: 7,
    width: 200,
    height: 200,
  },
  takeHit: {
    image: new Image(),
    frames: 3,
    width: 200,
    height: 200,
  },
}
const rightPlayer = {
  attack: {
    image: new Image(),
    frames: 3,
    width: 200,
    height: 200,
  },
  idle: {
    image: new Image(),
    frames: 3,
    width: 200,
    height: 200,
  },
  jump: {
    image: new Image(),
    frames: 1,
    width: 200,
    height: 200,
  },
  run: {
    image: new Image(),
    frames: 7,
    width: 200,
    height: 200,
  },
  takeHit: {
    image: new Image(),
    frames: 2,
    width: 200,
    height: 200,
  },
}

leftPlayer.attack.image.src = attackL
leftPlayer.idle.image.src = idleL
leftPlayer.jump.image.src = jumpL
leftPlayer.run.image.src = runL
leftPlayer.takeHit.image.src = takeHitL

rightPlayer.attack.image.src = attackR
rightPlayer.idle.image.src = idleR
rightPlayer.jump.image.src = jumpR
rightPlayer.run.image.src = runR
rightPlayer.takeHit.image.src = takeHitR

export default {
  left: leftPlayer,
  right: rightPlayer
}