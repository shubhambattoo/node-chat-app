const socket = io();

socket.on('connect', () => {
	console.log('connected to server');

	socket.emit('createMessage', {
		from: 'shubham',
		text: 'hi duniya'
	});

});

socket.on('disconnect', () => {
	console.log('Connection was interrupted')
})

socket.on('newMessage', (message) => {
	console.log('New Message');
	console.log(message)
})