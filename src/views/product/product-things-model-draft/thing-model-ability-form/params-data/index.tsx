import { PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { FC } from 'react';
import ParamsModalForm from './params-modal-form';
import _ from 'lodash';
type ParamsDataProps = {
    value?: any;
    onChange?: () => void;
    name: NamePath;
};
const ParamsData: FC<ParamsDataProps> = ({
    value,
    onChange,
    name = 'inputData',
}) => {
    return (
        <Form.List name={name}>
            {(fields, { add, remove }, { errors }) => {
                return (
                    <>
                        {fields?.map((field, index) => {
                            return (
                                <div key={field.key}>
                                    <Form.Item shouldUpdate noStyle>
                                        {(form) => {
                                            const namePath = _.concat(
                                                name,
                                                field.name
                                            );
                                            return (
                                                <ParamsModalForm
                                                    remove={() => {
                                                        remove(index);
                                                    }}
                                                    add={() => {
                                                        add();
                                                    }}
                                                    onChange={(value) => {
                                                        form.setFieldValue(
                                                            namePath,
                                                            value
                                                        );
                                                    }}
                                                    value={form.getFieldValue(
                                                        namePath
                                                    )}
                                                />
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
    );
};
export default ParamsData;
