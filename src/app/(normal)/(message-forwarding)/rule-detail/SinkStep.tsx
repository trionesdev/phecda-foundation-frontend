import { FC, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import { Button, message, Popconfirm, Space } from 'antd';
import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import _ from 'lodash';
import { SinkLinkForm } from '@/app/(normal)/(message-forwarding)/rule-detail/SinkLinkForm';

type SinkStepProps = {
    ruleId: string;
    rule?: any;
};
export const SinkStep: FC<SinkStepProps> = ({ ruleId, rule }) => {
    const [rows, setRows] = useState([]);

    const {
        run: handleQuerySinksList,
        refresh: handleRefreshSinksList,
        loading: sinksLoading,
    } = useRequest(
        () => messageForwardingApi.queryForwardingRuleSinksList(ruleId),
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res || []);
            },
        }
    );

    const handleDeleteSink = (record: any) => {
        messageForwardingApi
            .deleteForwardingRuleSink(ruleId, record.id)
            .then(async () => {
                message.success('删除成功');
                handleRefreshSinksList();
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const columns = [
        {
            title: '数据目的名称',
            dataIndex: 'name',
            width: 250,
        },
        {
            title: '数据目的描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        {!rule?.enabled && (
                            <Popconfirm
                                title={`确定删除数据目的吗？`}
                                onConfirm={() => handleDeleteSink(record)}
                            >
                                <Button type={`link`}>删除</Button>
                            </Popconfirm>
                        )}
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        if (ruleId) {
            handleQuerySinksList();
        }
    }, [ruleId]);

    return (
        <>
            <GridTable
                toolbar={
                    <TableToolbar
                        extra={
                            <Space>
                                <SinkLinkForm
                                    key={`link-btn`}
                                    ruleId={ruleId}
                                    onRefresh={handleRefreshSinksList}
                                >
                                    <Button
                                        type={`primary`}
                                        disabled={
                                            _.size(rows) >= 10 || sinksLoading
                                        }
                                    >
                                        关联数据目的
                                    </Button>
                                </SinkLinkForm>
                            </Space>
                        }
                    />
                }
                fit={true}
                size={`small`}
                columns={columns}
                dataSource={rows}
                loading={sinksLoading}
                pagination={false}
            />
        </>
    );
};
