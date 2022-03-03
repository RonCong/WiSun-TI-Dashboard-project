import { useState, useEffect } from "react";
import MyLineChart from '../components/MyLineChart'
import "./Home.css";
import {
  Layout,
  PageHeader,
  Row,
  Col,
  Select
} from "antd";

const { Content, Footer } = Layout;
const { Option } = Select;
function Home() {
  const [timeSlot, setTimeSlot] = useState(2);

  const handleChange = (e) => {
    setTimeSlot(e);
  }

  useEffect(() => { });

  return (
    <div className="app">
      <Layout className="layout">
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            title= "Your Wi-SUN Information"
            extra={
              <>
                <span style={{ fontSize: '16px', fontWeight: '700' }}> Time: </span><Select defaultValue={timeSlot} style={{ width: 120 }} onChange={handleChange}>
                  <Option value={0}>00:00-08:00</Option>
                  <Option value={1}>00:00-16:00</Option>
                  <Option value={2}>00:00-24:00</Option>
                </Select>
              </>}
        />
        </div>
        <Content style={{ padding: "0 50px" }} >
          <main className="site-layout-content" >
            <Row>
              <Col span={24}>
                <div className="first">
                  <MyLineChart timeSlot={timeSlot}></MyLineChart>
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
