import React from 'react'
import styles from './index.module.less'
import { TableToolbar, VPanel } from '@moensun/antd-react-ext'
import GridTable from '@components/grid-table'

const ProductionDevice: React.FC = () => {
    const tableBar = (
        <TableToolbar
            extra={
                <>新建设备</>
                // <DeviceForm
                //     key={`create-btn`}
                //     type={`primary`}
                //     onSuccess={handleRefresh}
                // >
                //     新建设备
                // </DeviceForm>,
            }
        />
    )
    return (
        <VPanel className={styles.productionDevice}>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={tableBar}
                fit={true}
                size={`small`}
                scroll={{ y: 'max-content' }}
                rowKey={`id`}
            />
        </VPanel>
    )
}

export default ProductionDevice
