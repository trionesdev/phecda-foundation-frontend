import { Form, Input } from 'antd';
import { MESSAGE_SINK_TYPE } from '@/app/normal/message-forwarding/internal/message-forwarding.enums';

export const KafkaSinkAction = () => {
    return (
        <>
            <Form.Item
                name={['action', 'type']}
                initialValue={MESSAGE_SINK_TYPE.KAFKA}
                hidden={true}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={`Bootstrap Servers`}
                name={[`action`, `bootstrapServers`]}
            >
                <Input placeholder={`请输入地址`} />
            </Form.Item>
            <Form.Item label={`Topic`} name={[`action`, `topic`]}>
                <Input placeholder={`请输入Topic`} />
            </Form.Item>
        </>
    );
};
