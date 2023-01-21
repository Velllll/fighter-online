const express = require('express')
const app = new express()
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()
const cors = require('cors')
require('dotenv').config({path: '.env'})

const PORT = process.env.PORT || 5500

app.use(express.json())
app.use(cors())


app.ws('/connect', function(ws, req) {
  ws.on('close', () => {

  })
  ws.on('message', function(msg) {
    const m = JSON.parse(msg)
    switch (m.method) {
      case 'connect':
        ws.player = {
          playerId: m.playerId
        }
        break;
      case 'choseSide':
        ws.player.side = m.side
        ws.send(JSON.stringify({
          method: 'choosed',
          side: m.side
        }))
        break
      case 'move':
        ws.player.playerPosition = m.playerPosition
        broadCastMovement(m.playerId, m.playerPosition, m.side)
        break
    }
  });
});

function broadCastMovement(playerIdMove, position, side) {
  aWss.clients.forEach(client => {
    if(client?.player?.playerId !== playerIdMove) {
      client.send(JSON.stringify({method: 'move', position, side}))
    }
  })
}

app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))