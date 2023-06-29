import { Button, ButtonProps, Form, Input, notification } from 'antd'
import { FC, useState } from 'react'
import { ModalForm } from '@moensun/antd-react-ext'

type ProductionDeviceTypeFormProps = {
    onSuccess?: () => void
} & ButtonProps
const ProductionDeviceTypeForm: FC<ProductionDeviceTypeFormProps> = ({
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const handleSubmit = (values: any) => {}

    return (
        <ModalForm
            open={open}
            title={`添加生产设备类型`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            onSubmit={handleSubmit}
        >
            <Form.Item label={`生产设备类型名称`} name={`name`}>
                <Input />
            </Form.Item>
        </ModalForm>
    )
}
export default ProductionDeviceTypeForm
