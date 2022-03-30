import * as echarts from "echarts";
import { useState, useEffect } from "react";


function MyLineChart() {

  //Function for getting the current date, and formatting it for the url for the database query
  function formatDateForDB(dateToBeFormatted) {
    function pad(stringPad) { return stringPad < 10 ? '0' + stringPad : stringPad }
    return dateToBeFormatted.getUTCFullYear() + '-'
      + pad(dateToBeFormatted.getUTCMonth() + 1) + '-'
      + pad(dateToBeFormatted.getUTCDate() - 7) + 'T'
      + pad(dateToBeFormatted.getUTCHours()) + ':'
      + pad(dateToBeFormatted.getUTCMinutes()) + ':'
      + pad(dateToBeFormatted.getUTCSeconds()) + 'Z'
  }

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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 94,
        end: 100,
        handleSize: 8
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%'
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {},
      }
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line'
      }
    ]
  };


  const [option, setOption] = useState(initOption);

  useEffect(() => {
    const chartDom = document.getElementById("MyLineChart")
    var testLineChart = echarts.init(chartDom)
    testLineChart.setOption(option)

    let unformattedDate = new Date()
    let formattedDate = formatDateForDB(unformattedDate) //Formatting for the http request, and subsequent db query

    testLineChart.showLoading()
    fetch(`http://localhost:3000/api/since?t=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        //Variables for storing values
        let sensorNames = []
        let sensorDataLengths = []
        let currentDataLength = 0
        let sensorSeriesData = []
        let totalSensorDataLength = data?.noiseReading?.length;
        console.log(`Total Data Length: ${totalSensorDataLength}`)
        console.log(data)

        //The loop below populates two arrays:
        //  The first is an array of strings. Each element is a sensor name (no duplicates)
        //  The second is an array of ints. Each element is the length of the sensor of the same index in the array above's data.
        //    So, sensorNames[0] is the name of the first sensor in the response, and sensorDataLengths[0] is the length of that sensor's data
        for (var x = 0; x < totalSensorDataLength; x++) {
          currentDataLength = currentDataLength + 1
          if (!sensorNames.includes(data?.noiseReading[x]?.sensor)) {
            sensorNames.push(data?.noiseReading[x]?.sensor)
          }
          if ((x + 1) != totalSensorDataLength) {
            if (!sensorNames.includes(data?.noiseReading[x + 1]?.sensor)) {
              sensorDataLengths.push(currentDataLength)
              currentDataLength = 0
            }
          }
          else { //This is for the end of the noiseReadings array, as the next element would not exist
            sensorDataLengths.push(currentDataLength)
            currentDataLength = 0
          }
        }

        //Counter for array index of whole response array
        let curGlobalIndex = 0
        //  To make this easier to understand:
        //    Outer loop creates objects for the series data
        //    Inner loop creates an array (currentSensorData) for storing arrays. The arrays being stored (dataPoints) have two indexes, one for x and one for y.
        //      The currentSensorData array should look like [[x, y], [x, y], [x, y]] for example, and have the entire datapoints for the current sensor
        //Outer loop iterates depending on how many different sensors there are
        for (var y = 0; y < sensorNames.length; y++) {
          let currentSensorData = []

          for (var z = 0; z < sensorDataLengths[y]; z++) {
            let dataPoints = []
            //let numberDate = dateToNumber(data?.noiseReading[curGlobalIndex]?.time)
            dataPoints.push(data?.noiseReading[curGlobalIndex]?.time) //x (date(string) converted to number)
            dataPoints.push(data?.noiseReading[curGlobalIndex]?.value) //y
            currentSensorData.push(dataPoints)
            curGlobalIndex++
          }

          sensorSeriesData.push({
            name: sensorNames[y],
            type: 'line',
            data: currentSensorData
          })
        }

        testLineChart.hideLoading()
        testLineChart.setOption({
          legend: {
            data: sensorNames,
            left: '20%'
          },
          xAxis: {
            type: 'time',
          },
          yAxis: {
            type: 'value'
          },
          series: sensorSeriesData
        })
      })
  })

  return (
    <>
      <div id="MyLineChart" style={{ width: '85vw', height: '80vh', fontFamily: "'Raleway', sans-serif" }}></div>
    </>
  )
}

export default MyLineChart;