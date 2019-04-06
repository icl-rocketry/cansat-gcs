class Cansat {
  constructor(port, baudrate = 9600) {
    if (port) this._port = port
    if (baudrate) this._baudrate = baudrate
  }

  get port() {
    return this._port
  }

  get baudrate() {
    return this._baudrate
  }

  set port(port) {
    this._port = port
  }

  set baudrate(baudrate) {
    this._baudrate = baudrate
  }

  getSerial() {
    console.log(this.port)
  }
}

export default Cansat
