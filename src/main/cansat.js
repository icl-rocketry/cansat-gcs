/* eslint-disable no-console */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

class Cansat {
  constructor(comPort, baudrate = 9600, win) {
    if (comPort) this._comPort = comPort
    this._baudrate = baudrate
    this.parser = new Readline()
    this.win = win
  }

  get comPort() {
    return this._comPort
  }

  get baudrate() {
    return this._baudrate
  }

  set comPort(comPort) {
    this._comPort = comPort
    this.win.webContents.send('port-change', this._comPort)
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

  openPort(cb) {
    if (this.port === undefined) this.initializePort()
    if (this.port.isOpen) return
    this.port.open(err => (err ? console.log('Error opening port: ', err.message) : cb()))
  }

  closePort(cb) {
    this.port.close(err => (err ? console.log('Error opening port: ', err.message) : cb()))
  }

  onData(cb) {
    return this.port.pipe(this.parser).on('data', cb)
  }
}

export default Cansat
