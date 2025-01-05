import { Col, Form, InputNumber, Row } from 'antd';
import { FC } from 'react';
import { ValueTypeProps } from './index';
import _ from 'lodash';
import { ValueTypeEnum } from '../../../internal/device.enum';

const ValueTypeFloat: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.Item label={`取值范围`}>
                <Form.Item
                    hidden={true}
                    name={_.concat(group, `valueType`)}
                    initialValue={ValueTypeEnum.FLOAT}
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
export default ValueTypeFloat;
