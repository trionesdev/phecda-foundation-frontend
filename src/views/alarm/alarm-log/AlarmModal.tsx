import React, { useCallback, useEffect } from 'react';
import styles from './AlarmModal.module.less';

import { Form, Image, Input, Modal, Radio, Space } from 'antd';
import FormInfo from '@/components/form-info';
import UploadImage from '@/components/upload/UploadImage';
import { AlarmLevelConfig } from '@/constants/consts';
import { ALARM_IMAGE_TYPE, ALARM_LEVEL, DEAL_STATUS } from '@/constants/enums';
import { alarmApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
type AlarmModalType = {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    currentData?: Record<string, any>;
    onSuccess?: () => void;
};

const AlarmModal: React.FC<AlarmModalType> = ({
    modalOpen,
    setModalOpen,
    currentData,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const noPending = currentData?.dealStatus !== DEAL_STATUS.PENDING;
    /** 删除设备 */
    const { run: editAlarmLogData } = useRequest(
        (id, data) => alarmApi.editAlarmLogById(id, data),
        {
            manual: true,
            onSuccess() {
                onSuccess?.();
                form.resetFields();
            },
        }
    );
    const getImagesByType = useCallback(
        (imageType: ALARM_IMAGE_TYPE) => {
            return currentData?.images?.filter(
                (i: any) => i.imageType === imageType
            );
        },
        [currentData?.images]
    );

    useEffect(() => {
        modalOpen &&
            form.setFieldsValue({
                images: getImagesByType(ALARM_IMAGE_TYPE.DEAL),
                dealStatus: currentData?.dealStatus,
                dealRemark: currentData?.dealRemark,
            });
    }, [currentData, form, getImagesByType, modalOpen]);
    return (
        <Modal
            getContainer={false}
            open={modalOpen}
            title="处理报警"
            onOk={() => {
                setModalOpen(false);
                const values = form.getFieldsValue(true);
                editAlarmLogData(currentData?.id, {
                    ...values,
                    images: [
                        ...getImagesByType(ALARM_IMAGE_TYPE.ALARM),
                        ...values?.images?.map((item: any) => {
                            return {
                                ...item,
                                imageType: ALARM_IMAGE_TYPE.DEAL,
                            };
                        }),
                    ],
                });
            }}
            onCancel={() => {
                setModalOpen(false);
                form.resetFields();
            }}
            wrapClassName={styles.modalWrapper}
        >
            <Form form={form}>
                <div className={styles.alarmInfoWrapper}>
                    <FormInfo
                        column={2}
                        data={[
                            {
                                label: '告警设备',
                                value: currentData?.deviceName,
                            },
                            // {
                            //     label: '告警类型',
                            //     value: '1号皮带机',
                            // },
                            {
                                label: '告警等级',
                                value: AlarmLevelConfig?.[
                                    currentData?.level as ALARM_LEVEL
                                ],
                            },
                            {
                                label: '告警数据',
                                value: '1号皮带机',
                            },
                        ]}
                    />
                    <FormInfo
                        column={1}
                        data={[
                            {
                                label: '告警图片',
                                value: currentData?.images
                                    ?.filter(
                                        (i: any) =>
                                            i.imageType ===
                                            ALARM_IMAGE_TYPE.ALARM
                                    )
                                    ?.map((item: any) => {
                                        return (
                                            <Image
                                                key={item?.uid}
                                                // width={100}
                                                height={100}
                                                src={item?.url}
                                            />
                                        );
                                    }),
                            },
                        ]}
                    />
                </div>

                <Form.Item name="dealStatus" label="是否为误报警">
                    <Radio.Group disabled={noPending}>
                        <Radio value={DEAL_STATUS.FALSE_ALARM}>误报警</Radio>
                        <Radio value={DEAL_STATUS.PROCESSED}>正确报警</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="dealRemark" label="处理结果">
                    <Input disabled={noPending} style={{ width: 230 }} />
                </Form.Item>
                <Form.Item
                    name="images"
                    label="上传图片"
                    valuePropName="fileList"
                >
                    <UploadImage disabled={noPending} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AlarmModal;
