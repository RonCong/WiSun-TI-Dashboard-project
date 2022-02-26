import { useState, useEffect } from "react";
import { Row, Col, Slider, InputNumber } from "antd";

function SliderInput() {
    const [inputValue, setInputValue] = useState(0);
    const marks = {
        0: 0,
        125: 125,
        250: 250,
    };

    const onChange = (value) => {
        setInputValue(value);
    };

    return (
        <Row>
            <Col span={16}>
                <Slider
                    min={0}
                    max={250}
                    onChange={onChange}
                    value={inputValue}
                    marks={marks}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={0}
                    max={250}
                    style={{
                        margin: "0 16px",
                    }}
                    onChange={onChange}
                    value={inputValue}
                />
            </Col>
        </Row>
    );
}

export default SliderInput;
