export default {
  type: 'line',
  options: {
    cubicInterpolationMode: 'monotone',
    scales: {
      options: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
      yAxes: [{
        ticks: {
          // eslint-disable-next-line consistent-return
          // callback(value) {
          //   if (!(value % 10)) {
          //     return value + 'm'
          //   }
          // },
          maxTicksLimit: 5,
        },
        scaleLabel: {
          display: false,
        },
        gridLines: {
          display: false,
        },
        offset: true,
      }],
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        offset: true,
        ticks: {
          maxTicksLimit: 9,
        },
        scaleLabel: {
          display: true,
          labelString: 'Running Time (s)',
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
    datasets: [{
      label: 'Altitude',
      data: [],
    }],
  },
}
