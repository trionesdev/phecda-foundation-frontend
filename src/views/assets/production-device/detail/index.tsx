import { PageHeader, VPanel } from '@moensun/antd-react-ext'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.less'
import { Tabs, TabsProps, Image, Spin } from 'antd'
import FormInfo from '@/components/form-info'
import { formatDateTime } from '@/commons/util/date.utils'
import { useRequest } from 'ahooks'
import { assetsApi } from '@/apis'
import { useEffect } from 'react'
import { AssetsStatesConfig } from '@/constants/consts'
import { ASSETS_STATES } from '@/constants/enums'
import UploadMyFile from '@/components/upload/UploadFile'

const ProductionDeviceDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    /** 查询设备信息 */
    const {
        loading,
        data,
        run: getAssetById,
    } = useRequest((id) => assetsApi.getAssetById(id), {
        manual: true,
    })
    useEffect(() => {
        getAssetById(id)
    }, [getAssetById, id])
    const pageHelper = (
        <PageHeader
            title={data?.name}
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
                                value: data?.name,
                            },
                            {
                                label: '规格型号',
                                value: data?.specification,
                            },
                            {
                                label: '区域位置',
                                value: data?.locationCode,
                            },
                            {
                                label: '设备类型',
                                value: data?.typeCode,
                            },
                            {
                                label: '备注',
                                value: data?.remark,
                            },
                        ]}
                    />
                    <FormInfo
                        title="使用情况"
                        data={[
                            {
                                label: '当前状态',
                                value: AssetsStatesConfig?.[
                                    data?.state as ASSETS_STATES
                                ],
                            },
                            {
                                label: '使用部门',
                                value: data?.departmentCode,
                            },
                            {
                                label: '负责岗位',
                                value: data?.postCode,
                            },
                            {
                                label: '启用日期',
                                value: formatDateTime(data?.createdAt),
                            },
                        ]}
                    />
                    <FormInfo
                        title="其他信息"
                        column={1}
                        data={[
                            {
                                label: '设备图片',
                                value: data?.images?.map((item: any) => {
                                    return (
                                        <Image
                                            width={200}
                                            key={item?.uid}
                                            src={item?.url}
                                        />
                                    )
                                }),
                            },
                            {
                                label: '相关文档',
                                value: (
                                    <UploadMyFile
                                        readonly
                                        fileList={data?.files}
                                    />
                                ),
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
        <Spin spinning={loading}>
            <VPanel className={styles.wrapper} header={pageHelper}>
                <Tabs items={items} />
            </VPanel>
        </Spin>
    )
}
export default ProductionDeviceDetail
