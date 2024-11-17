import React, {FC} from "react";
import {Form, Select} from "antd";
import {ModalForm} from "@trionesdev/antd-react-ext";
import {MESSAGE_TYPE} from "@/app/normal/message-forwarding/internal/message-forwarding.enums.ts";
import {MessageTypeOptions} from "@/app/normal/message-forwarding/internal/message-forwarding.constants.ts";

type ConditionFormProps = {
    children?: React.ReactElement;
    sourceId: string;
    onRefresh?: () => void;
}
export const ConditionForm: FC<ConditionFormProps> = ({
                                                          children,
                                                          sourceId,
                                                          onRefresh,
                                                      }) => {
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();
    const type = Form.useWatch('type', form);

    return <ModalForm trigger={children} open={open} title={`匹配条件`} form={form} afterOpenChange={(o) => {
        setOpen(o);
    }}>
        <Form.Item
            label={`消息类型`}
            name={`type`}
            initialValue={MESSAGE_TYPE.THING_PROPERTY_REPORT}
        >
            <Select options={MessageTypeOptions} />
        </Form.Item>
    </ModalForm>
}