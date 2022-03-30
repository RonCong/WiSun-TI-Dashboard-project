import * as echarts from "echarts";
import { useEffect } from "react";

const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 1000,
      splitNumber: 1,
      itemStyle: {
        color: '#FB4934',
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
        formatter: (value) => `${value}ms`,
        color: 'auto'
      },
      data: [
        {
          value: 860,
          name: 'Average Delay'
        }
      ]
    }
  ]
};

function ErrorRate() {
  useEffect(() => {
    const chartDom = document.getElementById("delay");
    echarts.init(chartDom).setOption(option)
  })

  return (
    <div id="delay" style={{ width: '300px', height: '300px', }}></div>
  )
}

export default ErrorRate;
