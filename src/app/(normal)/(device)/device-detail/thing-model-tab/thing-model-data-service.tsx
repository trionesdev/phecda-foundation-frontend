import React, { useEffect, useMemo, useState } from 'react';
import { GridTable, VPanel } from '@trionesdev/antd-react-ext';
import { useRequest } from 'ahooks';
import { deviceApi, loggingApi } from '@apis';
import { DatePicker, Form, Select } from 'antd';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';

const ThingModelDataService: React.FC<{
    deviceData: Record<string, any>;
}> = ({ deviceData }) => {
    const initDateValue = [dayjs().add(-1, 'h'), dayjs()];
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
        startTime: dayjs(initDateValue[0]).valueOf(),
        endTime: dayjs(initDateValue[1]).valueOf(),
    });

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            loggingApi.queryDevicesServiceLogPage(tableParams),
        { manual: true }
    );
    /** 请求对应产品的物模型数据 */
    const { data: productThingModelData, run: queryProductThingMode } =
        useRequest((id) => deviceApi.queryProductThingModel(id), {
            manual: true,
        });

    /** 服务名称的options */
    const productThingModelDataOptions = useMemo(() => {
        console.log(productThingModelData);
        return productThingModelData?.thingModel?.services?.map((item: any) => {
            return {
                label: item?.name,
                value: item?.name,
            };
        });
    }, [productThingModelData]);
    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
    useEffect(() => {
        if (deviceData?.product?.id) {
            queryProductThingMode(deviceData?.product.id);
        }
    }, [deviceData?.product?.id, queryProductThingMode]);
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
    const tableParamsFormItems = useMemo(
        () => (
            <>
                <Form.Item name="date" initialValue={initDateValue}>
                    <DatePicker.RangePicker showTime allowClear={false} />
                </Form.Item>
                <Form.Item name="serviceName" label="服务名称">
                    <Select
                        allowClear
                        style={{ width: 230 }}
                        options={productThingModelDataOptions}
                    />
                </Form.Item>
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [productThingModelDataOptions]
    );
    return (
        <VPanel>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <>
                        {/*<SearchToolbar*/}
                        {/*    formItems={tableParamsFormItems}*/}
                        {/*    onSearch={(values) => {*/}
                        {/*        const [start, end] = values.date ?? [*/}
                        {/*            undefined,*/}
                        {/*            undefined,*/}
                        {/*        ];*/}
                        {/*        const dataIsEmpty = isNilEmpty(values.date);*/}
                        {/*        setTableParams({*/}
                        {/*            pageNum: 1,*/}
                        {/*            pageSize: 10,*/}
                        {/*            startTime: dataIsEmpty*/}
                        {/*                ? undefined*/}
                        {/*                : dayjs(start).valueOf(),*/}
                        {/*            endTime: dataIsEmpty*/}
                        {/*                ? undefined*/}
                        {/*                : dayjs(end).valueOf(),*/}
                        {/*            serviceName: values?.serviceName,*/}
                        {/*            // ...v,*/}
                        {/*        });*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </>
                }
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
        </VPanel>
    );
};

export default ThingModelDataService;
