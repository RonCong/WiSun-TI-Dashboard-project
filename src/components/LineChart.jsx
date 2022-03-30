import * as echarts from "echarts";
import { useEffect } from "react";

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

function LineChart() {
  useEffect(() => {
    const chartDom = document.getElementById("lineChart");
    echarts.init(chartDom).setOption(option)
  })

  return (
    <div id="lineChart" style={{ width: '85vw', height: '500px', }}></div>
  )
}

export default LineChart;
