import { useState, useEffect } from "react";
import SliderInput from "../components/SliderInput";
import ErrorRate from '../components/ErrorRate'
import Delay from '../components/Delay'
import LineChart from '../components/LineChart'
import "./Home.css";
import {
  Layout,
  PageHeader,
  Button,
  Descriptions,
  Row,
  Col,
  Switch,
  Table,
  Tag,
  Tooltip,
  Progress
} from "antd";

const { Header, Content, Footer } = Layout;

function Home() {
  const [grade, setGrade] = useState('A+');
  const thirdData = [
    {
      key: '1',
      ip: 'abcd:abcd:abcd:abcd',
      nickName: '',
      status: 'success',
    },
    {
      key: '2',
      ip: 'abcd',
      nickName: '',
      status: 'success',
    },
    {
      key: '3',
      ip: 'abcd',
      nickName: 'Alpha',
      status: 'success',
    },
    {
      key: '4',
      ip: 'abcd',
      nickName: 'Alpha',
      status: 'error',
    },
  ];

  const thirdColumns = [
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      render: value => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      )
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: value => (
        <Tag color={value}> {value} </Tag>
      ),
    },
  ];

  const fourthData = [
    {
      key: '1',
      id: 'adba',
      start: '10/10 10:49',
      duration: 120,
      errorRate: 20
    },
    {
      key: '2',
      id: 'adba',
      start: '10/10 10:49',
      duration: 220,
      errorRate: 50
    },
    {
      key: '3',
      id: 'adba',
      start: '10/10 10:49',
      duration: 50,
      errorRate: 40
    },
    {
      key: '4',
      id: 'adba',
      start: '10/10 10:49',
      duration: 10,
      errorRate: 62
    },
  ];

  const fourthColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Duration(ms)',
      dataIndex: 'duration',
      key: 'duration',
      render: value => (
        <Tooltip title={`${value}ms`}>
          <Progress
            percent={value / 250 * 100}
            strokeColor={value > 200 ? '#FB4934' : (value > 100 ? '#FABD2F' : '#8EC07C')}
            showInfo={false} />
        </Tooltip>
      )
    },
    {
      title: 'Error Rate',
      dataIndex: 'errorRate',
      key: 'errorRate',
      render: value => (
        <Tooltip title={`${value}ms`}>
          <Progress
            percent={value}
            strokeColor={value > 60 ? '#FB4934' : (value > 30 ? '#FABD2F' : '#8EC07C')}
            showInfo={false} />
        </Tooltip>
      )
    },
  ];

  useEffect(() => { });

  return (
    <div className="app">
      <Layout className="layout">
        <PageHeader
          className="site-page-header"
          title="Your NetWork"
          extra={[<Switch key="1" />]}
        />
        <Content style={{ padding: "0 50px" }}>
          <main className="site-layout-content">
            <Row gutter={[30, 24]}>
              <Col span={12}>
                <div className="first">
                  <Descriptions
                    title="Ping Config"
                    bordered
                    extra={<Button>submit</Button>}
                  >
                    <Descriptions.Item
                      label="Packet Size"
                      span={3}
                    >
                      <SliderInput></SliderInput>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Timeout"
                      span={3}
                    >
                      <SliderInput></SliderInput>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Interval"
                      span={3}
                    >
                      <SliderInput></SliderInput>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Number of Packets"
                      span={3}
                    >
                      <SliderInput></SliderInput>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
              <Col span={12}>
                <div className="second">
                  <Descriptions
                    title="At A Glance"
                    bordered
                    extra={<div style={{ fontSize: '23px' }}>Grade: {grade}</div>}
                  >
                    <div>
                      <ErrorRate></ErrorRate>
                    </div>
                    <div>
                      <Delay></Delay>
                    </div>
                  </Descriptions>
                </div>
              </Col>
              <Col span={12}>
                <div className="third">
                  <Table rowSelection title={() => 'IP Addresses'} pagination={false} columns={thirdColumns} dataSource={thirdData} />
                </div>
              </Col>
              <Col span={12}>
                <div className="fourth">
                  <Table rowSelection title={() => 'IP Addresses'} pagination={false} columns={fourthColumns} dataSource={fourthData} />
                </div>
              </Col>
              <Col span={24}>
                <div className="fifth">
                  <LineChart></LineChart>
                </div>
              </Col>
            </Row>
          </main>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          NetWork ©2022 Created by EvilKind
        </Footer>
      </Layout>
    </div >
  );
}

export default Home;
