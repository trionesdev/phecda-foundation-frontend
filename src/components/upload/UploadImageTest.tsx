import React, { FC, useMemo, useState } from 'react'
import { Button, message, Upload } from 'antd'

import { UploadFile, UploadProps } from 'antd/lib/upload/interface'

export type UploadContainerProps = {
    onChange?: (fileList: UploadFile[]) => void
    /** 当前上传文件类型 */
}
export const UploadContainer: FC<UploadContainerProps> = ({ onChange }) => {
    //当前上传个数
    const [uploadNumber, setUploadNumber] = useState<number>(0)

    const changeFile: UploadProps['onChange'] = async ({ fileList }) => {
        setUploadNumber(fileList.length || 0)
        onChange?.(fileList)
    }

    return (
        <Upload
            listType="picture-card"
            data={{ scene: 'assets' }}
            action="api/be/oss/image/upload"
            maxCount={3}
            onChange={changeFile}
        >
            上传
        </Upload>
    )
}
