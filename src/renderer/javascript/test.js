class Test {
  constructor(name) {
    this.testName = name
    this.rawData = {}
    this.last = {}
    this.dataFrames = []
    Test.dataFields.forEach((field) => { this.rawData[field] = [] })
  }

  static get dataFields() {
    return [
      'frame', 'runTime', 'pressure', 'temperature', 'altitude', 'velocity', 'battery', 'softState',
      'accelX', 'accelY', 'accelZ', 'orientX', 'orientY', 'orientZ',
    ]
  }

  static processData(arr) {
    arr[1] /= 1000
    return arr
  }

  static get primaryField() {
    return Test.dataFields[0]
  }

  push(frame) {
    let arr = frame.split(':').map(x => parseFloat(x))
    arr.pop()
    if (arr.length !== Test.dataFields.length) {
      console.error('Data frame is invalid -', arr, arr.length, Test.dataFields.length)
      return this.last
    }
    const dataFrame = {}
    arr = Test.processData(arr)
    Test.dataFields.forEach((field) => {
      [dataFrame[field]] = arr
      this.rawData[field].push(arr.shift())
    })
    this.last = dataFrame
    this.dataFrames.push(dataFrame)
    return arr
  }

  get length() {
    return this.rawData[Test.primaryField].length
  }

  hasIncreased(field) {
    return this.rawData[field][this.length - 1] > this.rawData[field][this.length - 2]
  }
}

export default Test
