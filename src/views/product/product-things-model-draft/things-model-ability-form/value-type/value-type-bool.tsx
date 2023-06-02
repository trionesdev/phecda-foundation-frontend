import {Col, Form, Input, Row} from "antd";

const ValueTypeBool = () => {
    return <>
        <Form.Item label={`布尔值`} required={true}>
            <Row wrap={false} gutter={4}>
                <Col flex={"30px"}>0 -
                    <Form.Item hidden={true} noStyle={true} name={[0, `value`]}>
                        <Input value={0}/>
                    </Form.Item>
                </Col>
                <Col flex={`auto`}>
                    <Form.Item noStyle={true} name={[0, `name`]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row wrap={false} gutter={4}>
                <Col flex={"30px"}>1 -
                    <Form.Item hidden={true} noStyle={true} name={[1, `value`]}>
                        <Input value={1}/>
                    </Form.Item>
                </Col>
                <Col flex={`auto`}>
                    <Form.Item noStyle={true} name={[1, `name`]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    </>
}
export default ValueTypeBool