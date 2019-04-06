/* eslint-disable no-console */
import './stylesheets/main.scss'

// Small helpers you might want to keep
import './javascript/context_menu'
import './javascript/external_links'

import $ from 'jquery'

import './vendor/bootstrap.min'
import './vendor/Chart.min'
import './vendor/argon'

import './javascript/3dmodel'

import initChart from './main_chart'

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

const rawData = []
const battData = []
const timeData = []
const frameData = []
const altData = []
const velData = []
const $chart = $('#chart-sales')
const ctx = initChart($chart)
console.log(ctx)


const proData = (data) => {
  console.log(data)
  rawData.push(data)
  const dArr = data.split(':')
  battData.push(dArr[6])
  timeData.push(dArr[1])
  frameData.push(dArr[0])
  altData.push(dArr[4])
  velData.push(dArr[5])
  // console.log(battData[battData.length - 1])
  document.querySelector('#battery-val').textContent = battData[battData.length - 1]
  document.querySelector('#time-val').textContent = timeData[timeData.length - 1]
  document.querySelector('#frame-val').textContent = frameData[frameData.length - 1]
  document.querySelector('#alt-val').textContent = altData[altData.length - 1]
  document.querySelector('#vel-val').textContent = velData[velData.length - 1]

  if (frameData.length % 2) {
    addData(ctx, frameData[frameData.length - 1], altData[altData.length - 1])
  }
}

document.querySelector('#home-page').style.opacity = '1'

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
