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

const addData = (chart, label, data) => {
  if (chart.data.labels === undefined) chart.data.labels = []
  chart.data.labels.push(label)
  chart.data.datasets.forEach((dataset) => {
    if (dataset.data === undefined) dataset.data = []
    dataset.data.push(data)
  })
  chart.update()
}

let pipe

const $chart = $('#chart-sales')
// const ctx = initChart($chart)


const test = new Test()
const activeChart = 4

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
  // if (frameData.length % 2) {
  //   addData(ctx, frameData[frameData.length - 1], altData[altData.length - 1])
  // }
}

$(() => { document.querySelector('#home-page').style.opacity = '1' })

document.querySelector('#start-test-btn').addEventListener('click', () => {
  if (pipe === undefined) {
    cansat.openPort()
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

ipcRenderer.on('port-change', (_, message) => {
  document.querySelector('#port').textContent = message
})
