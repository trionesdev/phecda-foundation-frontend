import { useEffect, useMemo, useState } from 'react';
import {
    Button,
    DatePicker,
    Empty,
    Modal,
    Radio,
    RadioChangeEvent,
} from 'antd';
import GridTable from '@components/grid-table';
import styles from './property-data-modal.module.less';
import {
    formatDateTime,
    formatDateTimeSeconds,
} from '@/commons/util/date.utils';
import { TableParams } from '@/constants/types';
import { deviceDataApi } from '@/apis';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { Line, LineConfig } from '@ant-design/charts';
import { isNilEmpty } from '@/commons/util/isNilEmpty';

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
        field: propertyData?.identifier,
        deviceName: deviceData?.name,
        assetSn: 'assetSn',
    });

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            deviceDataApi.queryDeviceDataList(tableParams),
        { manual: true }
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
    useEffect(() => {
        isModalOpen && fetchTableData(tableParams);
    }, [fetchTableData, isModalOpen, tableParams]);
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
    const lineConfig: LineConfig = useMemo(() => {
        return {
            data: lineData,
            xField: 'time',
            yField: 'value',
            xAxis: {
                label: {
                    formatter: (time) => {
                        return formatDateTimeSeconds(Number(time));
                    },
                },
            },
        };
    }, [lineData]);

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
                footer={<Button onClick={handleCancel}>关闭</Button>}
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
                        <>
                            {isNilEmpty(lineData) ? (
                                <Empty />
                            ) : (
                                <Line {...lineConfig} />
                            )}
                        </>
                    )}
                    {viewType === 'table' && (
                        <GridTable
                            fit
                            size="small"
                            scroll={{ y: 'max-content' }}
                            rowKey="id"
                            columns={columns}
                            dataSource={tableData}
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
