import './stylesheets/main.scss'

// Small helpers you might want to keep
import './javascript/context_menu'
import './javascript/external_links'

// import $ from 'jquery';

// import './vendor/bootstrap.min.js';
// import './vendor/Chart.min.js';
// import './vendor/argon.js';

document.querySelector('#home-page').style.opacity = '1'

// import './javascript/3dmodel.js';

// var sp = require('serialport');

// sp.list(function (err, ports) {
//   console.log(ports);
// });

// function SerialGetAllPorts(selected) {
//     SerialPort.list(function (error, ports) {
//       if (error)
//         throw error;

//       ports.forEach(function (port) {
//         // Excluding ports not used for connections
//         if (port.comName.match(/Bluetooth-Incoming-Port/ig))
//           return;

//         var name = port.comName.replace(/(\/dev\/(cu|tty)?\.?)/g, '')
//         if (port.manufacturer !== undefined)
//           name = port.manufacturer + ' (' + name + ')';
//         console.log(port.comName, name)
//       });
//   })
// }
