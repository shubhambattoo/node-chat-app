const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath));

app.get('/', (req, res) => {
	res.render('index.html')
});

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'))

	socket.on('createMessage', (message) => {
		console.log('Message created');
		console.log(message);

		io.emit('newMessage', generateMessage(message.from, message.text));

	})

	socket.on('disconnect', () => {
		console.log('user was disconnected')
	});
});

server.listen(port, () => {
	console.log('Node server running on ' + port)
})