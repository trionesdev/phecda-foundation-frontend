import React, { useEffect, useMemo, useState } from 'react';
import { VPanel } from '@moensun/antd-react-ext';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { systemApi } from '@/apis';
import { DatePicker, Form, Select } from 'antd';
import SearchToolbar from '@/components/search-toolbar';
import { TableParams } from '@/constants/types';
import { formatDateTime } from '@/commons/util/date.utils';
import dayjs from 'dayjs';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
const ThingModelDataService: React.FC = () => {
    const initDateValue = [dayjs().add(-1, 'h'), dayjs()];
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
        beginTime: dayjs(initDateValue[0]).valueOf(),
        endTime: dayjs(initDateValue[1]).valueOf(),
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

    const handlePageChange = (pageNum: number, pageSize: number) => {
        setTableParams({ ...tableParams, pageNum, pageSize });
    };
    useEffect(() => {
        fetchTableData(tableParams);
    }, [fetchTableData, tableParams]);
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
            dataIndex: 'identifier',
        },
        {
            title: '服务名称',
            dataIndex: 'name',
        },
        {
            title: '输入参数',
            dataIndex: 'inputParams',
        },
        {
            title: '输出参数',
            dataIndex: 'outParams',
        },
    ];
    const tableParamsFormItems = useMemo(
        () => (
            <>
                <Form.Item name="date" initialValue={initDateValue}>
                    <DatePicker.RangePicker showTime allowClear={false} />
                </Form.Item>
                <Form.Item name="name" label="服务名称">
                    <Select allowClear style={{ width: 230 }} />
                </Form.Item>
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <VPanel>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                toolbar={
                    <>
                        <SearchToolbar
                            formItems={tableParamsFormItems}
                            onSearch={(values) => {
                                const [start, end] = values.date ?? [
                                    undefined,
                                    undefined,
                                ];
                                const dataIsEmpty = isNilEmpty(values.date);
                                setTableParams({
                                    pageNum: 1,
                                    pageSize: 10,
                                    beginTime: dataIsEmpty
                                        ? undefined
                                        : dayjs(start).valueOf(),
                                    endTime: dataIsEmpty
                                        ? undefined
                                        : dayjs(end).valueOf(),
                                    name: values?.name,
                                    // ...v,
                                });
                            }}
                        />
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
