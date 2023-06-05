import {Col, Form, Input, Row} from "antd";
import {FC} from "react";
import {ValueTypeEnum, ValueTypeProps} from "./index";
import _ from "lodash";

const ValueTypeFloat: FC<ValueTypeProps> = ({group}) => {
    return <>
        <Form.Item label={`取值范围`}>
            <Form.Item hidden={true} name={`valueType`} initialValue={ValueTypeEnum.FLOAT}>
                <input hidden={true}/>
            </Form.Item>
            <Row wrap={false} gutter={4}>
                <Col flex={"1 auto"}> <Form.Item noStyle={true} name={_.concat(group, `min`)} rules={[]}>
                    <Input/>
                </Form.Item></Col>
                <Col flex={"none"}>
                    ~
                </Col>
                <Col flex={"1 auto"}> <Form.Item noStyle={true} name={_.concat(group, `max`)}>
                    <Input/>
                </Form.Item></Col>
            </Row>
        </Form.Item>
        <Form.Item label={`步长`} name={_.concat(group, `step`)}>
            <Input/>
        </Form.Item>
    </>
}
export default ValueTypeFloat