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

  const getMaxData = async () => {
    //Getting dates, subtracting hours, and formatting them for the query
    let averageMaxMinDate = new Date()
    let averageMaxMaxDate = new Date()
    averageMaxMinDate.setDate(averageMaxMinDate.getDate() - 7)
    averageMaxMaxDate.setDate(averageMaxMaxDate.getDate() - 6)
    averageMaxMinDate.setHours(averageMaxMinDate.getHours() - averageMaxTimeMin)
    averageMaxMaxDate.setHours(averageMaxMaxDate.getHours() - averageMaxTimeMax)
    let formattedAverageMinDate = formatDateForDB(averageMaxMinDate)
    let formattedAverageMaxDate = formatDateForDB(averageMaxMaxDate)

    fetch(`${urlString}/api/noiseReading/max?start=${formattedAverageMinDate}&stop=${formattedAverageMaxDate}`)
      .then(firstResponse => firstResponse.json())
      .then(firstData => {
        let numNodes = firstData?.values?.length
        for(var i = 0; i < numNodes; i++) {
          tempMaxData.push(firstData?.values[i]?.value)
          tempSensorNames.push(firstData?.values[i]?.sensor)
        }
        return fetch(`${urlString}/api/noiseReading/average?start=${formattedAverageMinDate}&stop=${formattedAverageMaxDate}`)
          .then(secondResponse => secondResponse.json())
          .then(secondData => {
              
            for(var i = 0; i < numNodes; i++) {
              tempAverageMaxData.push({
                key: i,
                Node: tempSensorNames[i],
                Max: tempMaxData[i],
                Average: secondData?.values[i]?.value
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
      for(var i = 0; i < numNodes; i++) {
        tempRecentData.push({
          key: i,
          Node: data?.motionReading[i]?.sensor,
          MotionDetectedTime: data?.motionReading[i]?.time
        })
      }
      setRecentData(tempRecentData)
    }).catch(err => {
      console.error('Failed while fetching recent data')
      console.error(err)
    })
  }

  useEffect(() => {
    getMaxData()
    getRecentMotion()
  }, [])

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
                  <h2>Node Statistics</h2>
                  <Table title={() => (<Slider max='24' onAfterChange={onAfterChange1} range tooltipVisible defaultValue={[0, 24]} />)} columns={columns1} bordered dataSource={averageMaxData} pagination={{ position: ['none', 'none'] }} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="third">
                  <h2>Recent Motion Detection</h2>
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
