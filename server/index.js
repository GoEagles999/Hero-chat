const app = require('express')()
,	server = require('http').createServer(app)
,	socketIoServer = require('socket.io')(server)

socketIoServer.on('connection', socket => {
	//socket.emit('request', () => {})
 
	// broadcast incoming message to all clients 
	socket.on('message', message => {
		socketIoServer.emit('message', message)
	})
	socket.on('new-user', userName => {
		socketIoServer.emit('new-user', userName)
	})
	socket.on('user-left', userName => {
		socketIoServer.emit('user-left', userName)
	})
	socket.on('create-room', roomName => {
		socketIoServer.emit('room-created', roomName)
	})
})

app.get('/a', (req, res) => {
	res.send('ok')
})

server.listen(3001, () => {
	console.log('REST API and WebSocket running on port 3001')
})
