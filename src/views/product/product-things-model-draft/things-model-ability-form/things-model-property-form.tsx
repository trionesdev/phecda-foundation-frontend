import {Form, Input, Radio} from "antd";
import {FC} from "react";
import ValueType from "./value-type";

type ThingsModelPropertyFormProps = {}
const ThingsModelPropertyForm: FC<ThingsModelPropertyFormProps> = ({}) => {
    const ability = 'property'
    return <>
        <Form.Item label={`功能名称`} name={[ability, `name`]}>
            <Input/>
        </Form.Item>
        <Form.Item label={`标识符`} name={[ability, `identifier`]}>
            <Input/>
        </Form.Item>
        <ValueType group={ability}/>
        <Form.Item label={`读写类型`} name={[ability, `rw`]} required={true} initialValue={`RW`}>
            <Radio.Group>
                <Radio value={`RW`}>读写</Radio>
                <Radio value={`R`}>只读</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item label={`描述`} name={[ability, `description`]}>
            <Input.TextArea/>
        </Form.Item>
    </>
}
export default ThingsModelPropertyForm