import * as echarts from "echarts";
import { useEffect } from "react";

const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 1,
      itemStyle: {
        color: '#B8BB26',
        shadowColor: 'rgba(0,138,255,0.45)',
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      progress: {
        show: true,
        roundCap: true,
        width: 25
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 25
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        showMaxLabel: true,
        showMinLabel: true,
        distance: -50
      },
      title: {
        offsetCenter: [0, '-25%'],
        fontSize: 20
      },
      detail: {
        fontSize: 20,
        offsetCenter: [0, '0%'],
        valueAnimation: true,
        formatter: (value) => `${value}%`,
        color: 'auto'
      },
      data: [
        {
          value: 17,
          name: 'Error Rate'
        }
      ]
    }
  ]
};

function ErrorRate() {
  useEffect(() => {
    const chartDom = document.getElementById("errorRate");
    echarts.init(chartDom).setOption(option)
  })

  return (
    <div id="errorRate" style={{ width: '300px', height: '300px', }}></div>
  )
}

export default ErrorRate;
