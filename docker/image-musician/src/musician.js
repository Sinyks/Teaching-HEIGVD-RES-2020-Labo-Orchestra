// We use a standard Node.js module to work with UDP
const dgram = require('dgram');

const protocol = {
	PROTOCOL_PORT: 1234,
	PROTOCOL_MULTICAST_ADDRESS: '255.255.255.255' 
}

// Let's create a datagram socket. We will use it to send our UDP datagrams
const s = dgram.createSocket('udp4');

const activeSince = Date.now();

var instruments = new Map();
	instruments.set("piano", "ti-ta-ti");
	instruments.set("trumpet", "pouet");
	instruments.set("flute", "trulu");
	instruments.set("violin", "gzi-gzi");
	instruments.set("drum", "boum-boum");

// https://nodejs.org/api/process.html#process_process_env
const musician = process.env.instrument
// docker run res/musician -e instrument="piano"
// docker run 1234 piano

// Create object and serialize it to JSON
const obj = new Object();
obj.instrument = musician;
obj.sound = instruments.get(musician);
obj.activeSince = activeSince;

const payload = JSON.stringify(obj);

setInterval(function(){
		// Send the payload via UDP (multicast)
		message = new Buffer(payload);
		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
		function(err, bytes) {console.log("Sending payload: " + payload + " via port " + s.address().port);
		});
	}, 2000);
