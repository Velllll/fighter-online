const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const cors = require('cors')
require('dotenv').config({path: '.env'})

const PORT = process.env.PORT || 5500

app.use(express.json())
app.use(cors())

sides = {
  leftSocketId: '',
  rightSocketId: ''
}

io.on('connection', (socket) => {

  socket.emit('sidesStatus', {left: !!sides.leftSocketId, right: !!sides.rightSocketId})

  socket.on('disconnect', () => {
    cleanSides(socket)
  })

  socket.on('selectSide', ({side}) => {
    cleanSides(socket)
    if(side === 'left') {
      sides.leftSocketId = socket.id
    } else {
      sides.rightSocketId = socket.id
    }
    socket.emit('sidesStatus', {left: !!sides.leftSocketId, right: !!sides.rightSocketId})
    socket.broadcast.emit('sidesStatus', {left: !!sides.leftSocketId, right: !!sides.rightSocketId})
  })

  socket.on('move', (position) => {
    socket.broadcast.emit('playerMove', position)
  })
});

function cleanSides(socket) {
  for(let key in sides) {
    if(sides[key] === socket.id) {
      sides[key] = ''
      socket.broadcast.emit('sidesStatus', {left: !!sides.leftSocketId, right: !!sides.rightSocketId})
    }
  }
}


server.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))