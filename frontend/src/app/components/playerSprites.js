import attackL from '../../assets/leftPlayer/Attack2.png'
import idleL from '../../assets/leftPlayer/Idle.png'
import jumpL from '../../assets/leftPlayer/Jump.png'
import runL from '../../assets/leftPlayer/Run.png'
import takeHitL from '../../assets/leftPlayer/Take.png'

import attackR from '../../assets/leftPlayer/Attack2.png'
import idleR from '../../assets/leftPlayer/Idle.png'
import jumpR from '../../assets/leftPlayer/Jump.png'
import runR from '../../assets/leftPlayer/Run.png'
import takeHitR from '../../assets/leftPlayer/Take.png'

const leftPlayer = {
  attack: new Image(),
  idle: new Image(),
  jump: new Image(),
  run: new Image(),
  takeHit: new Image()
}
const rightPlayer = {
  attack: new Image(),
  idle: new Image(),
  jump: new Image(),
  run: new Image(),
  takeHit: new Image()
}

leftPlayer.attack.src = attackL
leftPlayer.idle.src = idleL
leftPlayer.jump.src = jumpL
leftPlayer.run.src = runL
leftPlayer.takeHit.src = takeHitL

rightPlayer.attack.src = attackR
rightPlayer.idle.src = idleR
rightPlayer.jump.src = jumpR
rightPlayer.run.src = runR
rightPlayer.takeHit.src = takeHitR

export default {
  left: leftPlayer,
  right: rightPlayer
}