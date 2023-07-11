import React, { useEffect, useState } from 'react';
import GridTable from '@components/grid-table';
import { useRequest } from 'ahooks';
import { assetsApi } from '@/apis';
import { Tag } from 'antd';
import { OptionsType, TableParams } from '@/constants/types';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';
const DeviceInfo: React.FC<{
    allDeviceDataOptions: OptionsType[];
    sn?: string;
}> = ({ allDeviceDataOptions, sn }) => {
    console.log(allDeviceDataOptions);
    const [tableParams, setTableParams] = useState<TableParams>({
        pageSize: 10,
        pageNum: 1,
        assetSn: sn,
    });

    /** 请求表格 */
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
    } = useRequest(
        (tableParams: TableParams) =>
            assetsApi.querySpacePartsPage(tableParams),
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
            title: '监测设备',
            dataIndex: 'deviceNames',
            render: (deviceNames: string[]) => {
                return deviceNames?.map((item) => {
                    return (
                        <Tag key={item}>
                            {findOptionsLabel(allDeviceDataOptions, item)}
                        </Tag>
                    );
                });
            },
        },
        {
            title: '监测配件类型',
            dataIndex: 'name',
        },
        {
            title: `配件编码`,
            dataIndex: 'sn',
        },

        {
            title: '配件状态',
            dataIndex: 'enable',
            render: (enable: boolean) => {
                return enable ? '开启' : '关闭';
            },
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
    ];

    return (
        <GridTable
            style={{ padding: '8px', backgroundColor: 'white' }}
            toolbar={<h2>设备配件</h2>}
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
    );
};

export default DeviceInfo;
