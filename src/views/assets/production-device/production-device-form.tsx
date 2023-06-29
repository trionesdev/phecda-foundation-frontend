import { Button, ButtonProps, Form, Input, notification } from 'antd'
import { FC, useState } from 'react'
import { ModalForm } from '@moensun/antd-react-ext'

type ProductionDeviceFormProps = {
    onSuccess?: () => void
} & ButtonProps
const ProductionDeviceForm: FC<ProductionDeviceFormProps> = ({
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const handleSubmit = (values: any) => {}

    return (
        <ModalForm
            open={open}
            title={`添加生产设备`}
            trigger={<Button {...rest} />}
            layout={`vertical`}
            onOpenChange={(op) => setOpen(op)}
            onSubmit={handleSubmit}
        >
            <Form.Item label={`生产设备名称`} name={`name`}>
                <Input />
            </Form.Item>
        </ModalForm>
    )
}
export default ProductionDeviceForm
