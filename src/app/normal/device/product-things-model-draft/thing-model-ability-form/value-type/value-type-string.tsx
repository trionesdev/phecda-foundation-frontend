import { FC } from 'react';
import { ValueTypeProps } from './index';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { ValueTypeEnum } from '../../../internal/device.enum';

const ValueTypeString: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.Item
                hidden={true}
                name={_.concat(group, `valueType`)}
                initialValue={ValueTypeEnum.STRING}
            >
                <input hidden={true} />
            </Form.Item>
            <Form.Item
                label={`数据长度`}
                name={_.concat(group, `length`)}
                rules={[{ required: true }]}
                initialValue={10240}
            >
                <Input addonAfter={`字节`} />
            </Form.Item>
        </>
    );
};
export default ValueTypeString;
