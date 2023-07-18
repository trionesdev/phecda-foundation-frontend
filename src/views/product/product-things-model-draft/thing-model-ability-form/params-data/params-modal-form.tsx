import { Button, Form, Input, Modal } from 'antd';
import { FC, useState } from 'react';
import _ from 'lodash';
import styles from './params-modal-form.module.less';
import ValueType from '../value-type';
type ParamsModalFormProps = {
    value?: any;
    onChange?: (value: any) => void;
    remove?: () => void;
    add?: () => void;
};
const ParamsModalForm: FC<ParamsModalFormProps> = ({
    value,
    onChange,
    remove,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    return (
        <>
            <div className={styles.nameWrapper}>
                <div>参数名称：{value?.paramName ?? '--'}</div>

                <div className={styles.buttonWrapper}>
                    <Button
                        onClick={() => {
                            setModalOpen(true);
                        }}
                        type="link"
                        size="small"
                    >
                        编辑
                    </Button>
                    <Button
                        onClick={() => {
                            remove?.();
                        }}
                        type="link"
                        size="small"
                    >
                        删除
                    </Button>
                </div>
            </div>
            <Modal
                open={modalOpen}
                title="参数设置"
                onCancel={() => {
                    setModalOpen(false);
                }}
                onOk={() => {
                    const formValue = form.getFieldsValue(true);
                    const valueTypeValue = formValue?.valueTypeGroup;
                    /** 由于 ValueType 组件必传一个group，所以数据结构需要修改*/
                    const confirmValue = _.omit(
                        {
                            ...formValue,
                            ...valueTypeValue,
                        },
                        'valueTypeGroup'
                    );
                    onChange?.(confirmValue);
                    setModalOpen(false);
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        paramName: value?.paramName,
                        identifier: value?.identifier,
                        valueTypeGroup: {
                            valueSpec: value?.valueSpec,
                            valueType: value?.valueType,
                        },
                    }}
                >
                    <Form.Item name="paramName" label="参数名称">
                        <Input />
                    </Form.Item>
                    <Form.Item label="标识符" name="identifier">
                        <Input />
                    </Form.Item>
                    <ValueType group={'valueTypeGroup'} />
                </Form>
            </Modal>
        </>
    );
};
export default ParamsModalForm;
