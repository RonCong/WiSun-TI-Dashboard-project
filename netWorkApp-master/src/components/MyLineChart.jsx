import * as echarts from "echarts";
import { useState, useEffect } from "react";

function MyLineChart(props) {
  const initOption = {
    title: {
      text: 'Sensor Noise Data'
    },
    textStyle: {
      fontFamily: 'Raleway'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Node1', 'Node2', 'Node3', 'Node4', 'Node5'],
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
        name: 'Node1',
        type: 'line',
        data: [25, 35, 35, 70, 65, 70, 100]
      },
      {
        name: 'Node2',
        type: 'line',
        data: [40, 52, 51, 64, 60, 65, 70]
      },
      {
        name: 'Node3',
        type: 'line',
        data: [30, 32, 37, 44, 49, 52, 60]
      },
      {
        name: 'Node4',
        type: 'line',
        data: [30, 33, 30, 34, 39, 30, 40]
      },
      {
        name: 'Node5',
        type: 'line',
        data: [80, 92, 90, 93, 120, 130, 132]
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
      <div id="MyLineChart" style={{ width: '85vw', height: '80vh', fontFamily: "'Raleway', sans-serif"}}></div>
    </>
  )
}

export default MyLineChart;