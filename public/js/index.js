const socket = io();

socket.on('connect', () => {
	console.log('connected to server');
});

socket.on('disconnect', () => {
	console.log('Connection was interrupted')
})

socket.on('newMessage', (message) => {
	// console.log('New Message');
	// console.log(message);
  // console.log(formattedTime)

  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text : message.text,
    from : message.from,
    time : formattedTime
  });
  $('#messages').append(html);

});

socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    url : message.url,
    from : message.from,
    time : formattedTime
  });

	$('#messages').append(html);
})

$('#message-form').on('submit', function (e) {
	e.preventDefault()

	socket.emit('createMessage', {
		from : 'User',
		text : $('[name=message]').val()
	});
  $('[name=message]').val('')
});

const buttonSelector = $('#send-location');

buttonSelector.on('click', function () {
  if (!navigator.geolocation) alert('Geolocation not supported');
  buttonSelector.attr('disabled',true).text('Sending Location...')

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    buttonSelector.attr('disabled',false).text('Send Location')
    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })

  }, function() {
    alert('Unable to fetch location bro');
    buttonSelector.attr('disabled',false).text('Send Location')
  });

})