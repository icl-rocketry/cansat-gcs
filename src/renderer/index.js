/* eslint-disable no-unused-vars */
import '@fortawesome/fontawesome-free/js/all'
import './stylesheets/vendor.scss'
import './stylesheets/main.scss'

import './javascript/context_menu'
import './javascript/external_links'

import $ from 'jquery'

import './vendor/argon/bootstrap.min'
import './vendor/Chart.min'
import './vendor/argon/argon'

import './javascript/3dmodel'

import { ipcRenderer } from 'electron'

import initChart from './javascript/main_chart'
import Test from './javascript/test'

const { cansat } = require('electron').remote.getCurrentWindow()

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
  const row = table.insertRow(-1)
  let i = 0
  Test.dataFields.forEach((field) => {
    if (i < 8) {
      document.getElementById(field).textContent = test.last[field]
      const cell = row.insertCell(-1)
      cell.textContent = test.last[field]
    }
    i += 1
  })
  addData(ctx, { x: test.last.runTime, y: test.last[Test.dataFields[activeChart]] })
}

const switchChart = (chart, newField) => {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = []
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
  cansat.openPort()
  document.querySelector('#open-port-btn').classList.add('d-none')
  document.querySelector('#close-port-btn').classList.remove('d-none')
  document.querySelector('#new-test-btn').classList.remove('disabled')

  document.querySelector('#new-test-btn').addEventListener('click', () => {
    test = new Test()
    document.querySelector('#new-test-btn').classList.add('d-none')
    document.querySelector('#start-test-btn').classList.remove('d-none')
    document.querySelector('#save-test-btn').classList.remove('d-none')
    document.querySelector('#reset-test-btn').classList.remove('d-none')
  })
})

document.querySelector('#start-test-btn').addEventListener('click', () => {
  if (pipe === undefined) {
    pipe = cansat.onData((data) => { proData(data) })
  } else {
    pipe.resume()
  }
  document.querySelector('#start-test-btn').classList.add('d-none')
  document.querySelector('#pause-test-btn').classList.remove('d-none')
  document.querySelector('#start-test-btn').textContent = 'Resume Test'
})

document.querySelector('#pause-test-btn').addEventListener('click', () => {
  pipe.pause()
  document.querySelector('#pause-test-btn').classList.add('d-none')
  document.querySelector('#start-test-btn').classList.remove('d-none')
})

document.querySelector('#reset-test-btn').addEventListener('click', () => {
  // TODO: Reset test action
})

ipcRenderer.on('port-change', (_, message) => {
  document.querySelector('#port').textContent = message
})
