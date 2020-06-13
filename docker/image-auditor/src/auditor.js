const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.bind(1234, () => {
  console.log('listen on port 1234');
  server.addMembership('239.255.255.0');
});
