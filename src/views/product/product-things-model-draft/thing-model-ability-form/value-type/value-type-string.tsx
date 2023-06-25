import { FC } from 'react'
import { ValueTypeEnum, ValueTypeProps } from './index'
import { Form, Input } from 'antd'
import _ from 'lodash'

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
                required={true}
                initialValue={10240}
            >
                <Input addonAfter={`字节`} />
            </Form.Item>
        </>
    )
}
export default ValueTypeString
