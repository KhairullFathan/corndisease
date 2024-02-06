import Chart from 'react-apexcharts'

const PieChart = (props) => {
  const {dataSeries, classname} = props
  const series = []
  const labels = []
  dataSeries?.map((e,i)=>{
    series.push(e[1])
    labels.push(e[0])
  })
  let total = series.reduce((acc, current)=>{
    return acc + current
  },0)
  // console.log(total)
  if ((100-total) > 0){
    series.push((100-total))
    labels.push('?')
  }
  const state = {
    series: series,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  }
  return (
    <Chart options={state.options} series={state.series} type="pie" width={500} height={320} className={`flex justify-center ${classname}`} />
  )
}

export default PieChart