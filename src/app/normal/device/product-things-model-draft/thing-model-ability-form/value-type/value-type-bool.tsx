import { Col, Form, Input, Row, Space } from 'antd';
import { FC } from 'react';
import { ValueTypeProps } from './index';
import _ from 'lodash';
import { ValueTypeEnum } from '../../../internal/device.enum';

const ValueTypeBool: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.Item label={`布尔值`} rules={[{ required: true }]}>
                <Space style={{ width: '100%' }} direction={'vertical'}>
                    <Row wrap={false} gutter={[4, 4]}>
                        <Col
                            flex={'30px'}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            0 -
                        </Col>
                        <Col flex={`auto`}>
                            <Form.Item
                                hidden={true}
                                name={_.concat(group, 0, `valueType`)}
                                initialValue={ValueTypeEnum.BOOL}
                            >
                                <input hidden={true} />
                            </Form.Item>
                            <Form.Item
                                hidden={true}
                                name={_.concat(group, 0, `value`)}
                                initialValue={0}
                            >
                                <input hidden={true} />
                            </Form.Item>
                            <Form.Item
                                noStyle={true}
                                name={_.concat(group, 0, `name`)}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row wrap={false} gutter={[4, 4]}>
                        <Col
                            flex={'30px'}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            1 -
                        </Col>
                        <Col flex={`auto`}>
                            <Form.Item
                                hidden={true}
                                name={_.concat(group, 1, `valueType`)}
                                initialValue={ValueTypeEnum.BOOL}
                            >
                                <input hidden={true} />
                            </Form.Item>
                            <Form.Item
                                hidden={true}
                                name={_.concat(group, 1, `value`)}
                                initialValue={1}
                            >
                                <input hidden={true} />
                            </Form.Item>
                            <Form.Item
                                noStyle={true}
                                name={_.concat(group, 1, `name`)}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Space>
            </Form.Item>
        </>
    );
};
export default ValueTypeBool;
