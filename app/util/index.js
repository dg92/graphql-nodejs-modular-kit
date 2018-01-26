const os = require('os');

// something to print ip wherever
function printIp() {
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;

    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      alias = alias+1;
    });
  });
}

// something to show stack traces of async exceptions
function handleAsyncExceptions() {
  if (handleAsyncExceptions.hooked === false) {
    process.on('unhandledRejection', (err) => {
      throw err;
    });

    handleAsyncExceptions.hooked = true;
  }
}

handleAsyncExceptions.hooked = false;

module.exports = {
  printIp,
  handleAsyncExceptions
};
