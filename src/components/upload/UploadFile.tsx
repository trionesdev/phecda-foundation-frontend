import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message } from 'antd'
import type { UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { isNilEmpty } from '@/commons/util/isNilEmpty'
import styles from './index.module.less'
const UploadMyFile: React.FC<{
    onChange?: (fileList: UploadFile[]) => void //由Form自动塞下来的onChange
    fileList?: UploadFile[] //由Form自动塞下来的fileList
    readonly?: boolean
}> = ({ onChange, fileList: initFileList, readonly }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    useEffect(() => {
        setFileList(initFileList ?? [])
    }, [initFileList])

    const handleBeforeUpload = async (file: any) => {
        let canUploadFlag = true
        if (canUploadFlag && file.size > 20 * 1024 * 1024) {
            message.error(`上传的文件大小最大20MB`)
            canUploadFlag = false
        }
        return canUploadFlag || Upload.LIST_IGNORE
    }
    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFileList: UploadFile<any>[] = fileList?.map((item) => {
            if (!isNilEmpty(item?.response?.url)) {
                return {
                    name: item?.name,
                    url: item?.response?.url ?? item?.thumbUrl,
                    uid: item?.uid,
                    status: 'done',
                }
            }
            return {
                ...item,
                status: item?.status ?? 'done',
                url: item?.url,
            }
        })
        onChange?.(newFileList)
        setFileList(newFileList)
    }

    return (
        <div className={styles.wrapper}>
            <Upload
                action="api/be/oss/file/upload"
                data={{ scene: 'assets' }}
                beforeUpload={handleBeforeUpload}
                fileList={fileList}
                onChange={handleChange}
            >
                {!readonly && (
                    <Button icon={<UploadOutlined />}>上传文件</Button>
                )}
            </Upload>
        </div>
    )
}

export default UploadMyFile
