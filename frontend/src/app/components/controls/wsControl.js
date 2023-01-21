export default class WsControl {

  constructor(player) {
    this.player = player

    this.ws = new WebSocket('ws://localgost:5000')
    this.ws.onopen = (e) => {

    }
    this.ws.onmessage = (e) => {
      
    }
    this.ws.onerror = (e) => {
      console.log('connection lost')
    } 
    this.ws.onclose = (e) => {
      console.log(e)
    }
  }

  updatePlayerPosition() {
    
  }
}