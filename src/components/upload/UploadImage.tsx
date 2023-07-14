import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import _ from 'lodash';
import { isNilEmpty } from '@/commons/util/isNilEmpty';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImage: React.FC<{
    onChange?: (fileList: UploadFile[]) => void; //由Form自动塞下来的onChange
    fileList?: UploadFile[]; //由Form自动塞下来的fileList
    disabled?: boolean;
}> = ({ onChange, fileList: initFileList, disabled }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    useEffect(() => {
        setFileList(initFileList ?? []);
    }, [initFileList]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        );
    };
    const handleBeforeUpload = async (file: any) => {
        const imageTypeArr = ['image/jpeg', 'image/jpg'];
        let canUploadFlag = true;
        if (_.intersection(imageTypeArr, [file.type]).length === 0) {
            message.error(`${file.name} is not png、jpeg、jpg`);
            canUploadFlag = false;
        }

        if (canUploadFlag && file.size > 5 * 1024 * 1024) {
            message.error(`上传的文件大小最大5MB`);
            canUploadFlag = false;
        }

        return canUploadFlag || Upload.LIST_IGNORE;
    };
    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFileList: UploadFile<any>[] = fileList?.map((item) => {
            if (!isNilEmpty(item?.response?.url)) {
                return {
                    name: item?.name,
                    url: item?.response?.url ?? item?.thumbUrl,
                    uid: item?.uid,
                    status: 'done',
                };
            }
            return {
                ...item,
                status: item?.status ?? 'done',
                url: item?.url,
            };
        });
        onChange?.(newFileList);
        setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传照片</div>
        </div>
    );
    return (
        <>
            <Upload
                action="api/be/oss/file/upload"
                data={{ scene: 'assets' }}
                listType="picture-card"
                beforeUpload={handleBeforeUpload}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/jpg, image/jpeg"
                disabled={disabled}
            >
                {fileList.length >= 3 || disabled ? null : uploadButton}
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default UploadImage;
