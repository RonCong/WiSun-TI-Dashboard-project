import { useState, useEffect } from "react";
import MyLineChart from '../components/MyLineChart'
import "./Home.css";
import {
  Layout,
  PageHeader,
  Row,
  Col,
  Slider,
  Table,
} from "antd";

const { Content, Footer } = Layout;

function Home() {

  let urlString = '';

  if(import.meta.env.MODE === 'development') {
    urlString = 'http://localhost:3000'
  }
  else if(import.meta.env.MODE === 'production') {
    urlString = 'https://wisun-demo.herokuapp.com'
  }

  const [averageMaxTimeMin, setAverageMaxTimeMin] = useState(24)
  const [averageMaxTimeMax, setAverageMaxTimeMax] = useState(0)
  const tempMaxData = []
  const tempAverageMaxData = []
  const tempSensorNames = []
  const [averageMaxData, setAverageMaxData] = useState([])
  const tempRecentData = []
  const [recentData, setRecentData] = useState([])

  //Function for getting the current date, and formatting it for the url for the database query
  function formatDateForDB(dateToBeFormatted) {
    function pad(stringPad) { return stringPad < 10 ? '0' + stringPad : stringPad }
    return dateToBeFormatted.getUTCFullYear() + '-'
      + pad(dateToBeFormatted.getUTCMonth() + 1) + '-'
      + pad(dateToBeFormatted.getUTCDate()) + 'T'
      + pad(dateToBeFormatted.getUTCHours()) + ':'
      + pad(dateToBeFormatted.getUTCMinutes()) + ':'
      + pad(dateToBeFormatted.getUTCSeconds()) + 'Z'
  }

  function formatDateForDisplay(givenUTCDate) {
    var convDate = new Date(givenUTCDate)
    return convDate.toString().substring(0, 24)
  }

  function truncate(n, digits) {
    var step = Math.pow(10, digits || 0);
    var temp = Math.trunc(step * n);

    return temp / step;
}

  const getMaxData = async () => {
    //Getting dates, subtracting hours, and formatting them for the query
    let averageMaxMinDate = new Date()
    let averageMaxMaxDate = new Date()
    averageMaxMinDate.setDate(averageMaxMinDate.getDate())
    averageMaxMaxDate.setDate(averageMaxMaxDate.getDate())
    averageMaxMinDate.setHours(averageMaxMinDate.getHours() - averageMaxTimeMin)
    averageMaxMaxDate.setHours(averageMaxMaxDate.getHours() - averageMaxTimeMax)
    let formattedAverageMinDate = formatDateForDB(averageMaxMinDate)
    let formattedAverageMaxDate = formatDateForDB(averageMaxMaxDate)

    fetch(`${urlString}/api/noiseReading/max?start=${formattedAverageMinDate}&stop=${formattedAverageMaxDate}`)
      .then(firstResponse => firstResponse.json())
      .then(firstData => {
        let numNodes = firstData?.values?.length
        let nodeCodename = ''
        for(var i = 0; i < numNodes; i++) {
          if (firstData?.values[i]?.sensor.substring(20) == '14f8:2b6a') {
            nodeCodename = 'Tango'
          } else if (firstData?.values[i]?.sensor.substring(20) == '14f9:425b') {
            nodeCodename = 'Bravo'
          } else if (firstData?.values[i]?.sensor.substring(20) == '14f8:2af0') {
            nodeCodename = 'Romeo'
          } else if (firstData?.values[i]?.sensor.substring(20) == '14f9:430d') {
            nodeCodename = 'Yankee'
          } else {
            nodeCodename = firstData?.values[i]?.sensor
          }
          console.log(firstData?.values[i]?.value)
          tempMaxData.push(truncate(firstData?.values[i]?.value, 2))
          tempSensorNames.push(nodeCodename)
        }
        return fetch(`${urlString}/api/noiseReading/average?start=${formattedAverageMinDate}&stop=${formattedAverageMaxDate}`)
          .then(secondResponse => secondResponse.json())
          .then(secondData => {
            tempSensorNames.sort()
            for(var i = 0; i < numNodes; i++) {
              tempAverageMaxData.push({
                key: i,
                Node: tempSensorNames[i],
                Max: tempMaxData[i],
                Average: truncate(secondData?.values[i]?.value, 2)
              })
            }
            setAverageMaxData(tempAverageMaxData)
          }).catch(err => {
            console.error('Failed while fetching averages')
            console.error(err)
          })
      }).catch(err => {
        console.error('Failed while fetching max values')
        console.error(err)
      })
  }

  const getRecentMotion = async () => {
    fetch(`${urlString}/api/recent/motionReading?v=1`)
    .then(response => response.json())
    .then(data => {
      let numNodes = data?.motionReading?.length
      let nodeCodename = ''
      for(var i = 0; i < numNodes; i++) {
        if (data?.motionReading[i]?.sensor.substring(20) == '14f8:2b6a') {
          nodeCodename = 'Tango'
        } else if (data?.motionReading[i]?.sensor.substring(20) == '14f9:425b') {
          nodeCodename = 'Bravo'
        } else if (data?.motionReading[i]?.sensor.substring(20) == '14f8:2af0') {
          nodeCodename = 'Romeo'
        } else if (data?.motionReading[i]?.sensor.substring(20) == '14f9:430d') {
          nodeCodename = 'Yankee'
        } else {
          nodeCodename = data?.motionReading[i]?.sensor
        }
        tempRecentData.push({
          key: i,
          Node: nodeCodename,
          MotionDetectedTime: formatDateForDisplay(data?.motionReading[i]?.time)
        })
      }
      tempRecentData.sort((a,b) => a.Node.localeCompare(b.Node))
      setRecentData(tempRecentData)
    }).catch(err => {
      console.error('Failed while fetching recent data')
      console.error(err)
    })
  }

  useEffect(() => {
    getMaxData()
    getRecentMotion()
  }, [averageMaxTimeMin, averageMaxTimeMax])

  const columns1 = [
    {
      title: 'Node',
      dataIndex: 'Node',
      key: 'Node',
    },
    {
      title: 'Max',
      dataIndex: 'Max',
      key: 'Max',
    },
    {
      title: 'Average',
      key: 'Average',
      dataIndex: 'Average',
    },
  ];
  const columns2 = [
    {
      title: 'Node',
      dataIndex: 'Node',
      key: 'Node',
    },
    {
      title: 'MotionDetectedTime',
      dataIndex: 'MotionDetectedTime',
      key: 'MotionDetectedTime',
    },
  ];

  const onAfterChange1 = (e) => {
    setAverageMaxTimeMax(e[0])
    setAverageMaxTimeMin(e[1])
  }

  return (
    <div className="app">
      <Layout className="layout">
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            title="Motion/Noise Sensor Dashboard"
          />
        </div>
        <Content style={{ padding: "0 50px" }} >
          <main className="site-layout-content" >
            <Row>
              <Col span={24}>
                <div className="first">
                  <MyLineChart></MyLineChart>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="second">
                  <h2>Sensor Noise Maximum and Average</h2>
                  <Table title={() => (<Slider max='24' onAfterChange={onAfterChange1} range tooltipVisible defaultValue={[0, 24]} />)} columns={columns1} bordered dataSource={averageMaxData} pagination={{ position: ['none', 'none'] }} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="third">
                  <h2>Recent Motion Detection on Each Sensor</h2>
                  <Table columns={columns2} bordered dataSource={recentData} pagination={{ position: ['none', 'none'] }} />
                </div>
              </Col>
            </Row>
          </main>
        </Content>
        <Footer style={{ textAlign: "center", background: "#ECECEC" }}>

        </Footer>
      </Layout>
    </div >
  );
}

export default Home;
