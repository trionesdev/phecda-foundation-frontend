import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    DatePicker,
    Empty,
    Modal,
    Radio,
    RadioChangeEvent,
} from 'antd';
import styles from './property-data-modal.module.less';
import { formatDateTime } from '@/commons/util/date.utils';
import { deviceDataApi } from '@apis/tenant';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import { GridTable } from '@trionesdev/antd-react-ext';

type PropertyDataModalType = {
    propertyData: Record<string, any>;
    deviceData: Record<string, any>;
};

const PropertyDataModal: React.FC<PropertyDataModalType> = ({
    propertyData,
    deviceData,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dateTime, setDateTime] = useState<any[]>([
        dayjs().add(-1, 'h'),
        dayjs(),
    ]);
    const [viewType, setViewType] = useState<'table' | 'chart'>('table');

    const [tableParams, setTableParams] = useState<any>({
        startTime: dayjs(dateTime[0]).valueOf(),
        endTime: dayjs(dateTime[1]).valueOf(),
        identifier: propertyData?.identifier,
        deviceName: deviceData?.name,
        assetSn: 'assetSn',
    });
    const [rows, setRows] = useState<any>([]);

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        () => {
            return deviceDataApi.queryPropertyDataList(tableParams);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res || []);
            },
        }
    );
    const lineData = useMemo(() => {
        if (isNilEmpty(tableData)) return [];
        return tableData?.map((item: any) => {
            return {
                time: formatDateTime(Number(item?.time)),
                value: item?.value,
            };
        });
    }, [tableData]);
    useEffect(() => {}, [fetchTableData, isModalOpen, tableParams]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: '时间',
            dataIndex: 'time',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '原始值',
            dataIndex: 'value',
        },
    ];

    return (
        <>
            <Button type="link" onClick={showModal}>
                查看数据
            </Button>
            <Modal
                width={800}
                title={`查看数据-${propertyData?.name}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div className={styles.operateWrapper}>
                    <DatePicker.RangePicker
                        showTime
                        allowClear={false}
                        value={dateTime as any}
                        onChange={(value) => {
                            setDateTime(value as any);
                            setTableParams({
                                ...tableParams,
                                startTime: dayjs(value?.[0]).valueOf(),
                                endTime: dayjs(value?.[1]).valueOf(),
                            });
                        }}
                    />
                    <Radio.Group
                        options={[
                            { label: '图表', value: 'chart' },
                            { label: '表格', value: 'table' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                        value={viewType}
                        onChange={({ target: { value } }: RadioChangeEvent) => {
                            setViewType(value);
                        }}
                    />
                </div>
                <div className={styles.contentWrapper}>
                    {viewType === 'chart' && (
                        <div className={styles.chartWrapper}>
                            {
                                isNilEmpty(lineData) ? <Empty /> : null
                                // <Line {...lineConfig} />
                            }
                        </div>
                    )}
                    {viewType === 'table' && (
                        <GridTable
                            fit
                            size="small"
                            rowKey="id"
                            columns={columns}
                            dataSource={rows}
                            loading={tableDataLoading}
                            pagination={false}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default PropertyDataModal;
