import { FC, useEffect, useState } from 'react';
import { Form, Image, Input, message, Modal } from 'antd';
import _ from 'lodash';
// import { alarmLogApi } from "../../../../apis/alarm";

interface AlarmLogFormProps {
    open?: boolean;
    onClose?: () => void;
    onSuccess?: () => void;
    id?: string;
    readOnly?: boolean;
}

const AlarmLogForm: FC<AlarmLogFormProps> = ({
    open = false,
    onClose,
    onSuccess,
    id,
    readOnly,
}) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<any>();

    useEffect(() => {
        setDrawerOpen(open!);
    }, [open]);

    useEffect(() => {
        if (id && open) {
            queryById();
        }
    }, [id, open]);

    const queryById = () => {
        // alarmLogApi.getById(id!).then((res: any) => {
        //     if (res) {
        //         assignFormData(res);
        //         setFormData(res);
        //         setFieldsValue(res);
        //     }
        // });
    };

    const assignFormData = (data: any) => {
        let text = _.get(data, 'alarmProperty');
        let property = '';
        if (text === 'AVERAGE_TEMPERATURES') {
            property = '平均温度';
        } else if (text === 'HIGHEST_TEMPERATURES') {
            property = '最高温度';
        } else if (text === 'AVERAGE_THICKNESS') {
            property = '平均壁厚';
        } else if (text === 'THINNEST_THICKNESS') {
            property = '最薄壁厚';
        }

        _.assign(data, {
            alarmPropertyName: property,
        });
    };

    const handleSubmit = (values: any, createNext?: boolean) => {
        let promise: Promise<any>;
        validateFields().then((values) => {
            _.assign(values, {
                id: id,
            });
            // promise = alarmLogApi.handle(values).then(async () => {
            //     message.success(`告警记录处理成功`);
            // });

            promise
                .then(() => {
                    if (!createNext) {
                        handleClose();
                    }
                    resetFields();
                    if (onSuccess) {
                        onSuccess();
                    }
                })
                .catch((e) => {
                    message.error(e.message);
                });
        });
    };

    const handleClose = () => {
        setDrawerOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            <Modal
                open={drawerOpen}
                title={`报警记录处理`}
                okText={`确定`}
                onCancel={handleClose}
                onOk={handleSubmit}
            >
                <Form form={form} layout={`vertical`}>
                    {/*<DrawerForm*/}
                    {/*    form={form}*/}
                    {/*    open={drawerOpen}*/}
                    {/*    title={"报警记录处理"}*/}
                    {/*    layout={`vertical`}*/}
                    {/*    width={720}*/}
                    {/*    okText={`确定`}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    onOk={handleSubmit}*/}
                    {/*    createNext={!id}*/}
                    {/*    values={formData}*/}
                    {/*    submitDisable={readOnly}*/}
                    {/*>*/}
                    <Form.Item
                        label={`处理结果`}
                        name={`dealRemark`}
                        rules={[{ required: true, message: '请输入处理结果!' }]}
                    >
                        <Input placeholder="请输入处理结果" />
                    </Form.Item>
                    <Form.Item label={`告警指标`} name={`alarmPropertyName`}>
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label={`告警图片`}>
                        {/*<Image src={_.get(formData,'imageUrl')} fallback={errorPng} />*/}
                        <Image src={_.get(formData, 'imageUrl')} />
                    </Form.Item>
                    {/*</DrawerForm>*/}
                </Form>
            </Modal>
        </>
    );
};

export default AlarmLogForm;
