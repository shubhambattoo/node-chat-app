const socket = io();

socket.on('connect', () => {
	console.log('connected to server');
});

socket.on('disconnect', () => {
	console.log('Connection was interrupted')
})

socket.on('newMessage', (message) => {
	console.log('New Message');
	console.log(message)
})