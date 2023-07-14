import { FC } from 'react';
import { Form, Input, Radio } from 'antd';
import ParamsData from './params-data';

type ThingsModelServiceFormProps = {};
const ThingModelServiceForm: FC<ThingsModelServiceFormProps> = () => {
    const ability = 'service';
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
            <Form.Item
                label={`调用方式`}
                name={[ability, 'callType']}
                required={true}
                initialValue={`ASYNC`}
            >
                <Radio.Group>
                    <Radio value={'ASYNC'}>异步</Radio>
                    <Radio value={'SYNC'}>同步</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={`输入参数`}>
                <ParamsData name="inputData" />
            </Form.Item>
            <Form.Item label={`输出参数`}>
                <ParamsData name={`outputData`} />
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
export default ThingModelServiceForm;
