class Test {
  constructor(name) {
    this.testName = name
    this.rawData = {}
    this.last = {}
    Test.dataFields.forEach((field) => { this.rawData[field] = [] })
  }

  static get dataFields() {
    return [
      'frame', 'runTime', 'pressure', 'temperature', 'altitude', 'velocity', 'battery', 'softState',
      'accelX', 'accelY', 'accelZ', 'orientX', 'orientY', 'orientZ',
    ]
  }

  static get primaryField() {
    return Test.dataFields[0]
  }

  push(frame) {
    const arr = frame.split(':').map(x => parseFloat(x))
    arr.pop()
    if (arr.length !== Test.dataFields.length) {
      console.error('Data frame is invalid -', arr, arr.length, Test.dataFields.length)
      return this.last
    }
    Test.dataFields.forEach((field) => {
      [this.last[field]] = arr
      this.rawData[field].push(arr.shift())
    })
    return arr
  }

  get length() {
    return this.rawData[this.primaryField].length
  }
}

export default Test
