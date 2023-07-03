import { PageHeader, VPanel } from '@moensun/antd-react-ext'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.less'
import _ from 'lodash'
import { Tabs, TabsProps, Image } from 'antd'
import FormInfo from '@/components/form-info'
import { formatDateTime } from '@/commons/util/date.utils'

const ProductionDeviceDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const pageHelper = (
        <PageHeader
            title="title"
            onBack={() => {
                navigate(-1)
            }}
        />
    )
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `基本信息`,
            children: (
                <div className={styles.infoWrapper}>
                    <FormInfo
                        title="设备信息"
                        data={[
                            {
                                label: '设备名称',
                                value: 'k2-1带',
                            },
                            {
                                label: '规格型号',
                                value: '1400*300',
                            },
                            {
                                label: '区域位置',
                                value: '高炉',
                            },
                            {
                                label: '设备类型',
                                value: '皮带机',
                            },
                            {
                                label: '备注',
                                value: 'sas',
                            },
                        ]}
                    />
                    <FormInfo
                        title="使用情况"
                        data={[
                            {
                                label: '当前状态',
                                value: '正常启用',
                            },
                            {
                                label: '使用部门',
                                value: '炼钢',
                            },
                            {
                                label: '负责岗位',
                                value: 'xx',
                            },
                            {
                                label: '启用日期',
                                value: formatDateTime(888888),
                            },
                        ]}
                    />
                    <FormInfo
                        title="其他信息"
                        data={[
                            {
                                label: '设备图片',
                                value: (
                                    <Image
                                        width={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                ),
                            },
                            {
                                label: '相关文档',
                                value: '',
                            },
                        ]}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: `设备情况`,
            children: <div className={styles.infoWrapper}>设备情况</div>,
        },
    ]
    return (
        <VPanel className={styles.wrapper} header={pageHelper}>
            <Tabs items={items} />
        </VPanel>
    )
}
export default ProductionDeviceDetail
