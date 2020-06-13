let dgram = require('dgram');

let server = dgram.createSocket('udp4');

server.bind(1234, function () {
  console.log('listen on port 1234');
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
