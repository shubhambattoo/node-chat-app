const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const path = require('path');

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

	socket.emit('newMessage', {
		from : 'Admin',
		text : 'Welcome to chat app',
		createdAt : new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from : 'Admin',
		text : 'New user joined',
		createdAt : new Date().getTime()
	})

	socket.on('createMessage', (message) => {
		console.log('Message created');
		console.log(message);

		io.emit('newMessage', {
			from : message.from,
			text : message.text,
			createdAt : new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : new Date().getTime()
		// });

	})

	socket.on('disconnect', () => {
		console.log('user was disconnected')
	});
});

server.listen(port, () => {
	console.log('Node server running on ' + port)
})