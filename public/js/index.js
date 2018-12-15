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

});

socket.on('newLocationMessage', (message) => {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);

	$('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
	e.preventDefault()

	socket.emit('createMessage', {
		from : 'User',
		text : $('[name=message]').val()
	}, function () {

	})
});

const buttonSelector = $('#send-location');

buttonSelector.on('click', function () {
  if (!navigator.geolocation) alert('Geolocation not supported');

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);

    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })

  }, function() {
    alert('Unable to fetch location bro')
  });

})