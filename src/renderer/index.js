/* eslint-disable no-unused-vars */
import '@fortawesome/fontawesome-free/js/all'
import './stylesheets/vendor.scss'
import './stylesheets/main.scss'

import './javascript/context_menu'
import './javascript/external_links'

import './vendor/argon/bootstrap.min'
import './vendor/Chart.min'
import './vendor/argon/argon'

import $ from 'jquery'
import { ipcRenderer, remote } from 'electron'
import fs from 'fs'

import { animate, resetOrientation } from './javascript/3dmodel'
import initChart from './javascript/main_chart'
import Test from './javascript/test'


const { cansat, CSVParser } = remote.getCurrentWindow()

const addData = (chart, data) => {
  chart.data.datasets.forEach((dataset) => {
    if (dataset.data === undefined) dataset.data = []
    dataset.data.push(data)
  })
  chart.update()
}

let pipe

const $chart = $('#chart-sales')
const ctx = initChart($chart)


let test
let activeChart = 4

const proData = (data) => {
  test.push(data)
  const table = document.getElementById('mainTable')
  const row = table.insertRow(0)
  let i = 0
  Test.dataFields.forEach((field) => {
    if (i < 8) {
      const el = document.getElementById(field)
      el.textContent = test.last[field]
      if (el.parentElement.tagName === 'SPAN') {
        if (test.hasIncreased(field)) {
          el.parentElement.classList.add('text-success')
          el.parentElement.classList.remove('text-danger')
          el.parentElement.firstElementChild.classList.add('fa-arrow-up')
          el.parentElement.firstElementChild.classList.remove('fa-arrow-down')
        } else {
          el.parentElement.classList.add('text-danger')
          el.parentElement.classList.remove('text-success')
          el.parentElement.firstElementChild.classList.add('fa-arrow-down')
          el.parentElement.firstElementChild.classList.remove('fa-arrow-up')
        }
      }
    }
    const cell = row.insertCell(-1)
    cell.textContent = test.last[field]
    i += 1
  })
  addData(ctx, { x: test.last.runTime, y: test.last[Test.dataFields[activeChart]] })
  animate(test.last.orientX, test.last.orientY, test.last.orientZ)
}

const switchChart = (chart, newField) => {
  chart.data.datasets.forEach((dataset) => {
    const data = []
    test.rawData[Test.dataFields[newField]].forEach((y, i) => {
      const x = test.rawData.runTime[i]
      data.push({
        x,
        y,
      })
    })
    dataset.data = data
  })
  document.getElementById('chartTitle').textContent = Test.dataFields[newField]
  chart.update()
}

const incrementField = () => {
  if (activeChart < 7) activeChart += 1
  else activeChart = 2
  switchChart(ctx, activeChart)
}

const decrementField = () => {
  if (activeChart > 2) activeChart -= 1
  else activeChart = 7
  switchChart(ctx, activeChart)
}

document.querySelector('#decrement-chart-btn').addEventListener('click', () => {
  decrementField()
})

document.querySelector('#increment-chart-btn').addEventListener('click', () => {
  incrementField()
})


$(() => { document.querySelector('#home-page').style.opacity = '1' })

document.querySelector('#open-port-btn').addEventListener('click', () => {
  cansat.openPort(() => {
    document.querySelector('#open-port-btn').classList.add('d-none')
    document.querySelector('#close-port-btn').classList.remove('d-none')
    if (test === undefined) {
      document.querySelector('#new-test-btn').classList.remove('d-none')
    } else {
      document.querySelector('#start-test-btn').classList.remove('d-none')
    }
    document.querySelector('#port-status').classList.add('bg-success')
    document.querySelector('#port-status').classList.remove('bg-danger')
  })
})

document.querySelector('#new-test-btn').addEventListener('click', () => {
  test = new Test()
  switchChart(ctx, activeChart)

  document.querySelector('#new-test-btn').classList.add('d-none')
  document.querySelector('#start-test-btn').classList.remove('d-none')

  document.querySelector('#save-test-btn').classList.remove('d-none')
  document.querySelector('#reset-test-btn').classList.remove('d-none')
})

document.querySelector('#close-port-btn').addEventListener('click', () => {
  cansat.closePort(() => {
    document.querySelector('#open-port-btn').classList.remove('d-none')
    document.querySelector('#close-port-btn').classList.add('d-none')
    document.querySelector('#new-test-btn').classList.add('d-none')
    document.querySelector('#start-test-btn').classList.add('d-none')
    document.querySelector('#pause-test-btn').classList.add('d-none')
    document.querySelector('#port-status').classList.remove('bg-success')
    document.querySelector('#port-status').classList.add('bg-danger')
    pipe = undefined
  })
})

const resetTest = () => {
  // TODO: Reset test action
}

const saveTest = () => {
  remote.dialog.showSaveDialog(remote.getCurrentWindow(), {}, (fileName) => {
    const saveString = JSON.stringify({ Test: test }, null, 4)
    fs.writeFileSync(fileName + '.json', saveString, 'utf-8')

    const fields = Test.dataFields
    const json2csvParser = new CSVParser({ fields })
    const csv = json2csvParser.parse(test.dataFrames)
    fs.writeFileSync(fileName + '.csv', csv, 'utf-8')
  })
}

document.querySelector('#start-test-btn').addEventListener('click', () => {
  if (pipe === undefined) {
    pipe = cansat.onData((data) => { proData(data) })
  } else {
    pipe.resume()
  }
  document.querySelector('#start-test-btn').classList.add('d-none')
  document.querySelector('#pause-test-btn').classList.remove('d-none')
  document.querySelector('#start-test-btn').textContent = 'Resume Test'

  document.querySelector('#reset-test-btn').classList.add('disabled')
  document.querySelector('#save-test-btn').classList.add('disabled')

  document.querySelector('#reset-test-btn').removeEventListener('click', resetTest)
  document.querySelector('#save-test-btn').removeEventListener('click', saveTest)
})

document.querySelector('#pause-test-btn').addEventListener('click', () => {
  pipe.pause()
  document.querySelector('#pause-test-btn').classList.add('d-none')
  document.querySelector('#start-test-btn').classList.remove('d-none')

  document.querySelector('#save-test-btn').classList.remove('disabled')
  document.querySelector('#reset-test-btn').classList.remove('disabled')

  document.querySelector('#reset-test-btn').addEventListener('click', resetTest)
  document.querySelector('#save-test-btn').addEventListener('click', saveTest)
})

document.querySelector('#reset-orientation-btn').addEventListener('click', resetOrientation)

ipcRenderer.on('port-change', (_, message) => {
  document.querySelector('#port').textContent = message
})
