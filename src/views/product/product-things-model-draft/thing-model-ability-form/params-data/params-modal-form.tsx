import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { FC, useState } from 'react';
import _ from 'lodash';
import styles from './params-modal-form.module.less';
import ValueType from '../value-type';
type ParamsModalFormProps = {
    value?: any;
    onChange?: () => void;
    namePath: NamePath;
    parentNamePath: (string | number)[];
    remove?: () => void;
    add?: () => void;
};
const ParamsModalForm: FC<ParamsModalFormProps> = ({
    value,
    onChange,
    namePath,
    parentNamePath,
    remove,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const name = _.isArray(namePath) ? namePath : [namePath];
    return (
        <>
            <div className={styles.nameWrapper}>
                <Form.Item noStyle shouldUpdate>
                    {(form) => {
                        const paramsName = form.getFieldValue([
                            ...parentNamePath,
                            ...name,
                            'paramName',
                        ]);
                        return <div>参数名称：{paramsName ?? '--'}</div>;
                    }}
                </Form.Item>

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
                title="处理报警"
                onCancel={() => {
                    setModalOpen(false);
                }}
                onOk={() => {
                    setModalOpen(false);
                }}
            >
                <Form.Item name={[...name, 'paramName']} label="参数名称">
                    <Input />
                </Form.Item>
                <Form.Item label="标识符" name={[...name, `identifier`]}>
                    <Input />
                </Form.Item>
                <ValueType group={namePath} />
            </Modal>
        </>
    );
};
export default ParamsModalForm;
