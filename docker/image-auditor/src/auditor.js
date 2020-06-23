const dgram = require('dgram');
const net = require('net');

const protocol = {
	PROTOCOL_PORT: 1234,
	PROTOCOL_MULTICAST_ADDRESS: '239.255.255.0'
}

const UDPClient = dgram.createSocket('udp4');

// and create a tcp server to transmit debug message
const TCPServer = net.createServer();

let musicians = new Map();

UDPClient.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    let uuid = JSON.parse(msg).uuid;

    if(!musicians.has(uuid)){
        musicians.set(uuid,JSON.parse(msg));
    }

});

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


UDPClient.bind(protocol.PROTOCOL_PORT, () => {
  console.log('listen on port: %j',UDPClient.address());
  UDPClient.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});
