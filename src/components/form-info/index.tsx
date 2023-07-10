import React from 'react';
import styles from './index.module.less';
import { Descriptions } from 'antd';

export type FormInfoDataType = {
    label: string;
    value?: React.ReactNode;
};
export type FormInfoType = {
    title: string;
    data?: FormInfoDataType[];
    column?: number;
};
const FormInfo: React.FC<FormInfoType> = ({ title, data, column }) => {
    return (
        <div className={styles.wrapper}>
            <Descriptions title={title} column={column}>
                {data?.map((item) => {
                    return (
                        <Descriptions.Item key={item?.label} label={item.label}>
                            {item?.value}
                        </Descriptions.Item>
                    );
                })}
            </Descriptions>
        </div>
    );
};

export default FormInfo;
