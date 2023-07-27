import { useEffect, useMemo, useState } from 'react';
import { Button, DatePicker, Modal, Radio, RadioChangeEvent } from 'antd';
import GridTable from '@components/grid-table';
import styles from './property-data-modal.module.less';
import {
    formatDateTime,
    formatDateTimeSeconds,
} from '@/commons/util/date.utils';
import { TableParams } from '@/constants/types';
import { systemApi } from '@/apis';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { Line, LineConfig } from '@ant-design/charts';
const lineData = [
    {
        time: '1991',
        value: 3,
    },
    {
        time: '1992',
        value: 4,
    },
    {
        time: '1993',
        value: 3.5,
    },
];
type PropertyDataModalType = {
    propertyData: Record<string, any>;
};

const PropertyDataModal: React.FC<PropertyDataModalType> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dateTime, setDateTime] = useState<any[]>([
        dayjs().add(-1, 'h'),
        dayjs(),
    ]);
    const [viewType, setViewType] = useState<'table' | 'chart'>('table');

    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
        beginTime: dayjs(dateTime[0]).valueOf(),
        endTime: dayjs(dateTime[1]).valueOf(),
    });

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            systemApi.queryDictionaryTypesPage(tableParams),
        { manual: true }
    );
    /** 请求图表 */
    // const { data: lineData, run: fetchLineData } = useRequest(
    //     (param: any) => deviceDataApi.queryDeviceDatasList(param),
    //     {
    //         manual: true,
    //     }
    // );
    // useEffect(() => {
    //     const param = {
    //         beginTime: dayjs(dateTime?.[0]).valueOf(),
    //         endTime: dayjs(dateTime?.[1]).valueOf(),
    //     };
    //     fetchLineData(param);
    // }, [fetchLineData,dateTime]);
    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
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
            dataIndex: 'createdAt',
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
                title="查看数据"
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
                                beginTime: dayjs(value?.[0]).valueOf(),
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
                            <Line {...lineConfig} />
                        </>
                    )}
                    {viewType === 'table' && (
                        <GridTable
                            fit
                            size="small"
                            scroll={{ y: 'max-content' }}
                            rowKey="id"
                            columns={columns}
                            dataSource={tableData?.rows}
                            loading={tableDataLoading}
                            pagination={{
                                ...tableParams,
                                onChange: handlePageChange,
                            }}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default PropertyDataModal;
