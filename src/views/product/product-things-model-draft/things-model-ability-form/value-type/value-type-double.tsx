import {Col, Form, Input, Row} from "antd";

const ValueTypeDouble = () => {
    return <>
        <Form.Item label={`取值范围`}>
            <Row wrap={false} gutter={4}>
                <Col flex={"1 auto"}> <Form.Item noStyle={true} name={`min`} rules={[]}>
                    <Input/>
                </Form.Item></Col>
                <Col flex={"none"}>
                    ~
                </Col>
                <Col flex={"1 auto"}> <Form.Item noStyle={true} name={`max`}>
                    <Input/>
                </Form.Item></Col>
            </Row>
        </Form.Item>
        <Form.Item label={`步长`} name={`step`}>
            <Input/>
        </Form.Item>
    </>
}
export default ValueTypeDouble