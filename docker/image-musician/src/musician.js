// We use a standard Node.js module to work with UDP
const dgram = require('dgram');

// We will use uuid package to generate a UUID
const { v4: uuidv4 } = require('uuid');

const protocol = {
	PROTOCOL_PORT: 1234,
	PROTOCOL_MULTICAST_ADDRESS: '239.255.255.0'
}

const argInstrument = 2;

// Let's create a datagram socket. We will use it to send our UDP datagrams
const s = dgram.createSocket('udp4');

const activeSince = Date.now();

let instruments = new Map();
	instruments.set("piano", "ti-ta-ti");
	instruments.set("trumpet", "pouet");
	instruments.set("flute", "trulu");
	instruments.set("violin", "gzi-gzi");
	instruments.set("drum", "boum-boum");

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const musician = process.argv[argInstrument];
// docker run res/musician piano

// Create object and serialize it to JSON
const obj = new Object();
obj.instrument = musician;
obj.sound = instruments.get(musician);
obj.activeSince = activeSince;
obj.uuid = uuidv4();

const payload = JSON.stringify(obj);

setInterval(() => {
		// Send the payload via UDP (multicast)
		let message = Buffer.from(payload);

		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
		function(err, bytes) {
			console.log("Sending payload: " + payload + " via port " + s.address().port);
		});
	}, 2000);
