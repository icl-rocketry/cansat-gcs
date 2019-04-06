/* eslint-disable */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

class Cansat {
  constructor(comPort, baudrate = 9600) {
    if (comPort) this._comPort = comPort
    this._baudrate = baudrate
    this.parser = new Readline()
  }

  get comPort() {
    return this._comPort
  }

  get baudrate() {
    return this._baudrate
  }

  set comPort(comPort) {
    this._comPort = comPort
    this.initializePort()
  }

  set baudrate(baudrate) {
    this._baudrate = baudrate
    this.initializePort()
  }

  initializePort() {
    if (this.port !== undefined && this.port.isOpen) {
      this.port.close(() => { console.log('Port is now closed.') })
    }
    this.port = new SerialPort(this._comPort, {
      baudRate: this._baudrate,
      autoOpen: false,
    })
  }

  openPort() {
    if (this.port === undefined) this.initializePort()
    if(this.port.isOpen) return
    this.port.open((err) => {
      if (err) {
        console.log('Error opening port: ', err.message)
      }
    })
  }

  onData(cb) {
    return this.port.pipe(this.parser).on('data', cb)
  }
}

export default Cansat
/* eslint-enable */
