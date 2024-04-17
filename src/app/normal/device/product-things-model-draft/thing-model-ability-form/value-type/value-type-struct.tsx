import { Button, Form } from 'antd';
import _ from 'lodash';
import { FC } from 'react';
import { ValueTypeProps } from './index';
import { PlusOutlined } from '@ant-design/icons';
import ParamsModalForm from '../params-data/params-modal-form';
import { ValueTypeEnum } from '../../../internal/device.enum';

const ValueTypeStruct: FC<ValueTypeProps> = ({ group = 'valueSpecs' }) => {
    return (
        <>
            <Form.List name={group}>
                {(fields, { add, remove }, { errors }) => {
                    return (
                        <>
                            {fields?.map((field, index) => {
                                return (
                                    <div key={field.key}>
                                        <Form.Item shouldUpdate noStyle>
                                            {(form) => {
                                                const namePath = _.concat(
                                                    group,
                                                    field.name
                                                );
                                                return (
                                                    <>
                                                        <Form.Item
                                                            hidden={true}
                                                            name={[
                                                                field.name,
                                                                `valueType`,
                                                            ]}
                                                            initialValue={
                                                                ValueTypeEnum.STRUCT
                                                            }
                                                        >
                                                            <input
                                                                hidden={true}
                                                            />
                                                        </Form.Item>
                                                        <ParamsModalForm
                                                            remove={() => {
                                                                remove(index);
                                                            }}
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                form.setFieldValue(
                                                                    namePath,
                                                                    value
                                                                );
                                                            }}
                                                            value={form.getFieldValue(
                                                                namePath
                                                            )}
                                                            isChild={true}
                                                        />
                                                    </>
                                                );
                                            }}
                                        </Form.Item>
                                    </div>
                                );
                            })}
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                }}
                                style={{ width: '50%', marginBottom: 24 }}
                                icon={<PlusOutlined />}
                            >
                                添加参数
                            </Button>
                        </>
                    );
                }}
            </Form.List>
        </>
    );
};
export default ValueTypeStruct;
