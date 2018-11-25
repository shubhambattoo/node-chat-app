const socket = io();

socket.on('connect', () => {
	console.log('connected to server');
});

socket.on('disconnect', () => {
	console.log('Connection was interrupted')
})

socket.on('newMessage', (message) => {
	console.log('New Message');
	console.log(message);

	const li = $('<li></li>');
	li.text(`${message.from} : ${message.text}`);

	$('#messages').append(li);

})

$('#message-form').on('submit', function (e) {
	e.preventDefault()

	socket.emit('createMessage', {
		from : 'User',
		text : $('[name=message]').val()
	}, function () {

	})
})