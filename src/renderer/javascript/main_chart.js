/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Chart from '../vendor/Chart.min'

const init = newChart => new Chart(newChart, {
  type: 'line',
  options: {
    scales: {
      yAxes: [{
        gridLines: {
          color: '#212529',
          zeroLineColor: '#212529',
        },
        ticks: {
          // eslint-disable-next-line consistent-return
          callback(value) {
            if (!(value % 10)) {
              return value + 'm'
            }
          },
        },
      }],
    },
    tooltips: {
      callbacks: {
        label(item, data) {
          const label = data.datasets[item.datasetIndex].label || ''
          const { yLabel } = item
          let content = ''

          if (data.datasets.length > 1) {
            content += '<span class="popover-body-label mr-auto">' + label + 's</span>'
          }

          content += '<span class="popover-body-value">' + yLabel + 'm</span>'
          return content
        },
      },
    },
  },
  data: {
    labels: [10],
    datasets: [{
      label: 'Altitude',
      data: [10],
    }],
  },
})

export default $chart => init($chart)
