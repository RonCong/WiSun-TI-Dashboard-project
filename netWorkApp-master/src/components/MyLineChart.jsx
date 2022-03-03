import * as echarts from "echarts";
import { useState, useEffect } from "react";

function MyLineChart(props) {
  const initOption = {
    title: {
      text: 'NetWork'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['One', 'Two', 'Three', 'Four', 'Five'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'One',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Two',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Three',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Four',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Five',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  const timeList = [
    ['00:00', '04:00', '08:00'],
    ['00:00', '04:00', '08:00', '12:00', '16:00'],
    ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']];

  const [option, setOption] = useState(initOption);

  useEffect(() => {
    const chartDom = document.getElementById("MyLineChart");
    echarts.init(chartDom).setOption(option)
  })

  useEffect(() => {
    setOption({
      ...option,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeList[props.timeSlot]
      },
    });
  }, [props.timeSlot])

  return (
    <>
      <div id="MyLineChart" style={{ width: '85vw', height: '80vh', }}></div>
    </>
  )
}

export default MyLineChart;
