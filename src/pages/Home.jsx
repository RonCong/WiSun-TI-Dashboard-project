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
  const columns1 = [
    {
      title: 'NodeName',
      dataIndex: 'NodeName',
      key: 'NodeName',
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
      title: 'NodeName',
      dataIndex: 'NodeName',
      key: 'NodeName',
    },
    {
      title: 'MotionDetectedTime',
      dataIndex: 'MotionDetectedTime',
      key: 'MotionDetectedTime',
    },
  ];

  const data1 = [
    {
      key: '1',
      NodeName: 'Node1',
      Max: 32,
      Average: 12,
    },
    {
      key: '2',
      NodeName: 'Node2',
      Max: 32,
      Average: 12,
    },
    {
      key: '3',
      NodeName: 'Node3',
      Max: 32,
      Average: 12,
    },
    {
      key: '4',
      NodeName: 'Node4',
      Max: 32,
      Average: 12,
    },
    {
      key: '5',
      NodeName: 'Node5',
      Max: 32,
      Average: 12,
    },

  ];

  const data2 = [
    {
      key: '1',
      NodeName: 'Node1',
      MotionDetectedTime: 12,
    },
    {
      key: '2',
      NodeName: 'Node2',
      MotionDetectedTime: 12,
    },
    {
      key: '3',
      NodeName: 'Node3',
      MotionDetectedTime: 12,
    },
    {
      key: '4',
      NodeName: 'Node4',
      MotionDetectedTime: 12,
    },
    {
      key: '5',
      NodeName: 'Node5',
      MotionDetectedTime: 12,
    },

  ];

  const onAfterChange1 = (e) => {
    console.log(e)
  }
  const onAfterChange2 = (e) => {
    console.log(e)
  }

  useEffect(() => { });

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
                  <Table title={() => (<Slider max='24' onAfterChange={onAfterChange1} range tooltipVisible defaultValue={[0, 24]} />)} columns={columns1} bordered dataSource={data1} pagination={{ position: ['none', 'none'] }} />
                  <Table title={() => (<Slider max='24' onAfterChange={onAfterChange2} range tooltipVisible defaultValue={[0, 24]} />)} columns={columns2} bordered dataSource={data2} pagination={{ position: ['none', 'none'] }} />
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
