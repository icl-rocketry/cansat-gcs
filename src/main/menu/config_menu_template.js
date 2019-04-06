const sp = require('serialport')

const portLabelTemplate = (port) => {
  const label = port.comName + (port.manufacturer ? ` (${port.manufacturer})` : '')
  const sublabel = port.comName
  return {
    type: 'radio',
    checked: false,
    sublabel,
    label,
    click: (menuItem, BrowserWindow) => {
      console.log('Selected Port', menuItem.sublabel)
      BrowserWindow.cansat.port = menuItem.sublabel
    },
  }
}

const listSerialPorts = () => {
  const portLabels = []
  sp.list((err, ports) => {
    if (err) {
      portLabels.push({
        label: 'Error reading serial ports',
        enalbed: false,
      })
    } else {
      ports.forEach((port) => {
        portLabels.push(portLabelTemplate(port))
      })
    }
  })
  return portLabels
}

const listBaudrates = () => {
  const baudrates = [1200, 2400, 4800, 9600, 19200].map((baudrate) => {
    const label = `${baudrate} baud`
    const sublabel = baudrate.toString()
    return {
      type: 'radio',
      checked: baudrate === 9600,
      sublabel,
      label,
      click: (menuItem, BrowserWindow) => {
        console.log('Selected Baudrate', menuItem.sublabel)
        BrowserWindow.cansat.baudrate = parseInt(menuItem.sublabel, 10)
      },
    }
  })
  console.log(baudrates)
  return baudrates
}

export default {
  label: 'Config',
  submenu: [
    {
      label: 'Port',
      submenu: listSerialPorts(),
    },
    {
      label: 'Baudrate',
      submenu: listBaudrates(),
    },
  ],
}
