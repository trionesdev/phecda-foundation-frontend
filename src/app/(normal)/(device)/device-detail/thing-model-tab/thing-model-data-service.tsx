import React, { useEffect, useState } from 'react';
import { GridTable, SearchToolbar } from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { deviceDataApi } from '@apis';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import { ThingModelServiceSelect } from '@/app/(normal)/(device)/device-detail/thing-model-tab/ThingModelServiceSelect';

const ThingModelDataService: React.FC<{
    deviceData: Record<string, any>;
}> = ({ deviceData }) => {
    const initDateValue = [dayjs().add(-1, 'h'), dayjs()];
    const [params, setParams] = useState<{
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }>({
        pageSize: 10,
        pageNum: 1,
        startTime: dayjs(initDateValue[0]).valueOf(),
        endTime: dayjs(initDateValue[1]).valueOf(),
    });
    const [rows, setRows] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);

    /** 请求表格 */
    const { loading: tableDataLoading, run: fetchServiceData } = useRequest(
        () => {
            return deviceDataApi.queryServiceLogsPage(params);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res?.rows);
                setTotal(res?.total);
            },
        }
    );

    useEffect(() => {
        fetchServiceData();
    }, [params]);

    const columns = [
        {
            title: '时间',
            dataIndex: 'createdAt',
            render: (value: number) => {
                return formatDateTime(value);
            },
        },
        {
            title: '标识符',
            dataIndex: 'serviceIdentifier',
        },
        {
            title: '服务名称',
            dataIndex: 'serviceName',
        },
        {
            title: '输入参数',
            dataIndex: 'inputData',
            render: (inputData: Record<string, any>) => {
                return JSON.stringify(inputData);
            },
        },
        {
            title: '输出参数',
            dataIndex: 'outputData',
            render: (outputData: Record<string, any>) => {
                return JSON.stringify(outputData);
            },
        },
    ];

    return (
        <GridTable
            style={{ padding: '8px', backgroundColor: 'white' }}
            toolbar={
                <SearchToolbar
                    items={[
                        {
                            label: '服务',
                            name: 'serviceIdentifier',
                            children: (
                                <ThingModelServiceSelect
                                    productId={deviceData.productId}
                                />
                            ),
                        },
                    ]}
                    onSearch={(values) => {
                        setParams({ ...params, ...values });
                    }}
                />
            }
            fit
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={rows}
            loading={tableDataLoading}
            pagination={{
                ...params,
                total,
                onChange: (pageNum, pageSize) => {
                    setParams({ ...params, pageNum, pageSize });
                },
            }}
        />
    );
};

export default ThingModelDataService;
