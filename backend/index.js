const http = require('http')
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: 'http:localhost:3000'
    }
})

io.on('Connect', (socket) => {
    console.log(`User Connected ${socket.id}`)

    socket.on('joinRoom', (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined Room ${data}`)
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('receiveMessage', data)
    })

    socket.on('Disconnect', () => {
        console.log('User Disconnected', socket.id)
    })
})

server.listen(8000, () => {
    console.log('Backend Server Running on PORT 8000')
})
