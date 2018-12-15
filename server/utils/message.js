const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (from, lat, lon) => {
  return  {
    from,
    url : `https://www.google.co.in/maps?q=${lat},${lon}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}