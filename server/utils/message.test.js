const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

	it('should generate correct message object', () => {
		const from = 'Mike';
		const text = 'Hello world';
		const message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	})
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Adam';
    const lat = 15;
    const lon = 19;
    const url = 'https://www.google.co.in/maps?q=15,19';
    const message = generateLocationMessage(from, lat, lon);

    expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,url});
  })
})