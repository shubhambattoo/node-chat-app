const socket = io();

function scrollToBottom() {
  // Selectors
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMsgHeight = newMessage.innerHeight();
  const lastMsgHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  // console.log('connected to server');
  const params = $.deparam(window.location.search);
  socket.emit('join',params, function(err) {
    if(err) {
      alert(err)
      window.location.href = '/';
    } else {
      console.log('No errors')
    }
  })
});

socket.on('disconnect', () => {
	console.log('Connection was interrupted')
});

socket.on('updateUserList',function (users) {
  console.log('Users list', users);
  const ol = $('<ol></ol>');
  users.forEach((user) => {
    ol.append($('<li></li>').text(user))
  });
  $("#users").html(ol);
});

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
  scrollToBottom();
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
  scrollToBottom();  
})

$('#message-form').on('submit', function (e) {
	e.preventDefault()

	socket.emit('createMessage', {
		text : $('[name=message]').val()
	}, function () {
    $('[name=message]').val('')
  });
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