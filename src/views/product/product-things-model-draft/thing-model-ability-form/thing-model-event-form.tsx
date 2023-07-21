import { FC } from 'react';
import { Form, Input, Radio } from 'antd';
import ParamsData from './params-data';

type ThingsModelEventFormProps = {};
const ThingModelEventForm: FC<ThingsModelEventFormProps> = () => {
    const ability = 'event';
    return (
        <>
            <Form.Item
                label={`功能名称`}
                name={[ability, `name`]}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`标识符`}
                name={[ability, `identifier`]}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`事件类型`}
                name={[ability, 'type']}
                rules={[{ required: true }]}
                initialValue={`INFO`}
            >
                <Radio.Group>
                    <Radio value={'INFO'}>信息</Radio>
                    <Radio value={'WARN'}>告警</Radio>
                    <Radio value={'ERROR'}>故障</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={`输出参数`}>
                <ParamsData name={[ability, `outParams`]} />
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
export default ThingModelEventForm;
