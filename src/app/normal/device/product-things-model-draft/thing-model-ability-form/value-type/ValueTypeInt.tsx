import { Col, Form, InputNumber, Row } from 'antd';
import _ from 'lodash';
import { FC } from 'react';
import { ValueTypeProps } from './index';
import { ValueTypeEnum } from '../../../internal/device.enum';

const ValueTypeInt: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.Item label={`取值范围`}>
                <Form.Item
                    hidden={true}
                    name={_.concat(group, `valueType`)}
                    initialValue={ValueTypeEnum.INT}
                >
                    <input hidden={true} />
                </Form.Item>
                <Row wrap={false} gutter={4}>
                    <Col flex={'1 auto'}>
                        {' '}
                        <Form.Item
                            noStyle={true}
                            name={_.concat(group, `min`)}
                            rules={[]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col flex={'none'}>~</Col>
                    <Col flex={'1 auto'}>
                        {' '}
                        <Form.Item noStyle={true} name={_.concat(group, `max`)}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item label={`步长`} name={_.concat(group, `step`)}>
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
        </>
    );
};
export default ValueTypeInt;
