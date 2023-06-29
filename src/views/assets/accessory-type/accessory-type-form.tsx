import { Button, ButtonProps, Form, Input, notification } from 'antd'
import { FC, useState } from 'react'
import { ModalForm } from '@moensun/antd-react-ext'

type AccessoryTypeFormProps = {
    onSuccess?: () => void
} & ButtonProps
const AccessoryTypeForm: FC<AccessoryTypeFormProps> = ({
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const handleSubmit = (values: any) => {}

    return (
        <ModalForm
            open={open}
            title={`新增配件类型`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            onSubmit={handleSubmit}
        >
            <Form.Item label={`配件类型名称`} name={`name`}>
                <Input />
            </Form.Item>
        </ModalForm>
    )
}
export default AccessoryTypeForm
