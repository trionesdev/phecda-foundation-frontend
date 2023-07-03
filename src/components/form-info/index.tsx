import React from 'react'
import styles from './index.module.less'
import { Descriptions } from 'antd'

export type FormInfoDataType = {
    label: string
    value?: React.ReactNode
}
export type FormInfoType = {
    title: string
    data?: FormInfoDataType[]
}
const FormInfo: React.FC<FormInfoType> = ({ title, data }) => {
    return (
        <div className={styles.wrapper}>
            <Descriptions title={title}>
                {data?.map((item) => {
                    return (
                        <Descriptions.Item key={item?.label} label={item.label}>
                            {item?.value}
                        </Descriptions.Item>
                    )
                })}
            </Descriptions>
        </div>
    )
}

export default FormInfo
