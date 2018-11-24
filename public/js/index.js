const socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createEmail', {
        to: 'snoop@dogg.com',
        text : 'diddy killed pac dogg'
    })
});

socket.on('disconnect', () => {
    console.log('Connection was interrupted')
})

socket.on('newEmail', (email) => {
    console.log('New Email');
    console.log(email)
})