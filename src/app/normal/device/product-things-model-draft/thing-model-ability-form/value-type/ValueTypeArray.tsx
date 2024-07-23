import { Form, InputNumber, Radio } from 'antd';
import { ValueTypeProps } from './index';
import { FC } from 'react';
import { ArraySubValueTypeOptions } from '@/app/normal/device/internal/device.constants';
import _ from 'lodash';
import { ValueTypeEnum } from '@/app/normal/device/internal/device.enum';

export const ValueTypeArray: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.Item
                hidden={true}
                name={_.concat(group, `valueType`)}
                initialValue={ValueTypeEnum.ARRAY}
            >
                <input hidden={true} />
            </Form.Item>
            <Form.Item
                label={`元素类型`}
                name={_.concat(group, `subValueType`)}
                required={true}
            >
                <Radio.Group options={ArraySubValueTypeOptions} />
            </Form.Item>
            <Form.Item
                label={`元素个数`}
                name={_.concat(group, `size`)}
                initialValue={10}
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
        </>
    );
};
