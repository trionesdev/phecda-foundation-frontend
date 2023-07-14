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
                                    <ParamsModalForm
                                        namePath={field.name}
                                        parentNamePath={
                                            _.isArray(name) ? name : [name]
                                        }
                                        remove={() => {
                                            remove(index);
                                        }}
                                        add={() => {
                                            add();
                                        }}
                                    />
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
