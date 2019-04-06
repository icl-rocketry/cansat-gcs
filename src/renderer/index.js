/* eslint-disable no-console */
import './stylesheets/main.scss'

// Small helpers you might want to keep
import './javascript/context_menu'
import './javascript/external_links'

// import $ from 'jquery'

import './vendor/bootstrap.min'
import './vendor/Chart.min'
import './vendor/argon'

import './javascript/3dmodel'

const { cansat } = require('electron').remote.getCurrentWindow()

let parser

document.querySelector('#home-page').style.opacity = '1'

document.querySelector('#start-test-btn').addEventListener('click', () => {
  cansat.openPort()
  parser = cansat.onData((data) => { console.log(data) })
  console.log(parser)
})

document.querySelector('#reset-test-btn').addEventListener('click', () => {
  parser.destroy()
  console.log(parser)
})
