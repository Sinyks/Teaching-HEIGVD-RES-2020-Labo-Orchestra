const dgram = require('dgram');
const net = require('net');

// Moment js we help us to manage date and time
const moment = require('moment');

const protocol = {
	PROTOCOL_PORT: 1234,
	PROTOCOL_MULTICAST_ADDRESS: '239.255.255.0'
}

const maxInactivityTime = 5;

const UDPClient = dgram.createSocket('udp4');

// and create a tcp server to transmit debug message
const TCPServer = net.createServer();
let musicians = new Map();

/*
	TCP SERVER
*/

TCPServer.on('listening', () => {
  console.log("The socket is bound and the server is listening for connection requests.");
	console.log("Socket value: %j", TCPServer.address());
})

TCPServer.on('connection', (socket) => {
  let myArray = Array.from(musicians.values());

  socket.write(JSON.stringify(myArray, null,4));

});

// we tell our tcp connection to listen on tcp port 2205
TCPServer.listen(2205);

/*
	UDP SERVER
*/

UDPClient.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

		let musician = JSON.parse(msg);

		musician.lastActivityTime = moment.now();
		musician.active = true;

    musicians.set(musician.uuid,musician);

});

setInterval(() => {
	musicians.forEach((musician) => {
		const inactivityTime = moment().diff(musician.lastActivityTime, 'seconds');
		// console.log(inactivityTime);
		if (inactivityTime > maxInactivityTime){
			musician.active = false;

		}
		console.log(musician);

	});

}, 2000);

UDPClient.bind(protocol.PROTOCOL_PORT, () => {
  console.log('listen on port: %j',UDPClient.address());
  UDPClient.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});
