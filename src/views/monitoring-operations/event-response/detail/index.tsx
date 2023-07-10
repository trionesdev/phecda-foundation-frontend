import React from 'react'
import styles from './index.module.less'
import { PageHeader, VPanel } from '@moensun/antd-react-ext'
import { useNavigate, useParams } from 'react-router-dom'

const SceneDetail: React.FC = () => {
    const { id: typeCode } = useParams()

    const navigate = useNavigate()

    const pageHelper = (
        <PageHeader
            title="场景详情"
            onBack={() => {
                navigate(-1)
            }}
        />
    )
    return (
        <VPanel className={styles.wrapper} header={pageHelper}>
            <div className={styles.contentWrapper}>场景详情</div>
        </VPanel>
    )
}

export default SceneDetail
