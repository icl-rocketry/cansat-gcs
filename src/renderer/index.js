import './stylesheets/main.scss'

// Small helpers you might want to keep
import './javascript/context_menu'
import './javascript/external_links'

// import $ from 'jquery'

import './vendor/bootstrap.min'
import './vendor/Chart.min'
import './vendor/argon'

import './javascript/3dmodel'


document.querySelector('#home-page').style.opacity = '1'


// const sp = require('serialport')

// sp.list((err, ports) => {
//   console.log(ports)
// })

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
