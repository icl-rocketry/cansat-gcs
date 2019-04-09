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
          display: true,
          labelString: 'Acceleration (ms-2)',
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
      data: [
        { x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 100 },
        { x: 150, y: 150 }, { x: 200, y: 200 }, { x: 250, y: 250 }, { x: 270, y: 250 },
        { x: 300, y: 300 }, { x: 350, y: 350 }, { x: 400, y: 400 },
        { x: 450, y: 450 }, { x: 500, y: 400 },
      ],
    }],
  },
}
