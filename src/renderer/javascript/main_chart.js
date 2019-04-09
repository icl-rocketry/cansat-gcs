/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Chart from '../vendor/Chart.min'
import mainChartTemplate from './chart_template'

const init = newChart => new Chart(newChart, mainChartTemplate)

export default $chart => init($chart)
