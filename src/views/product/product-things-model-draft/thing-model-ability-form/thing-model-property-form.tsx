import { Form, Input, Radio } from 'antd';
import { FC } from 'react';
import ValueType from './value-type';

type ThingsModelPropertyFormProps = {};
const ThingModelPropertyForm: FC<ThingsModelPropertyFormProps> = ({}) => {
    const ability = 'property';
    return (
        <>
            <Form.Item
                label={`功能名称`}
                name={[ability, `name`]}
                required={true}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`标识符`}
                name={[ability, `identifier`]}
                required={true}
            >
                <Input />
            </Form.Item>
            <ValueType group={ability} />
            <Form.Item
                label={`读写类型`}
                name={[ability, `rw`]}
                required={true}
                initialValue={`RW`}
            >
                <Radio.Group>
                    <Radio value={`RW`}>读写</Radio>
                    <Radio value={`R`}>只读</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={`描述`}
                name={[ability, `description`]}
                initialValue={''}
            >
                <Input.TextArea />
            </Form.Item>
        </>
    );
};
export default ThingModelPropertyForm;
