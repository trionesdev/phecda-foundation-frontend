import { Button, Form } from 'antd';
import _ from 'lodash';
import { FC } from 'react';
import { ValueTypeEnum, ValueTypeProps } from './index';
import ParamsModalForm from '@views/product/product-things-model-draft/thing-model-ability-form/params-data/params-modal-form';
import { PlusOutlined } from '@ant-design/icons';

const ValueTypeStruct: FC<ValueTypeProps> = ({ group }) => {
    return (
        <>
            <Form.List name={group!}>
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
                                                            add={() => {
                                                                add();
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
                                onClick={() => add()}
                                style={{ width: '50%' }}
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
