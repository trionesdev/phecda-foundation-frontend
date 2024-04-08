import { FC, useEffect, useState } from 'react';
import { GridTable, TableToolbar } from '@trionesdev/antd-react-ext';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRequest } from 'ahooks';
import { messageForwardingApi } from '@apis';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '@/router/routes.constants';
import { SourceLinkForm } from '@/app/(normal)/(message-forwarding)/rule-detail/SourceLinkForm';

type SourceStepProps = {
    ruleId: string;
    rule?: any;
};

export const SourceStep: FC<SourceStepProps> = ({ ruleId, rule }) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const {
        run: handleQuerySourcesList,
        refresh: handleRefreshSourcesList,
        loading: sourcesLoading,
    } = useRequest(
        () => messageForwardingApi.queryForwardingRuleSourcesList(ruleId),
        {
            manual: true,
            onSuccess: (res: any) => {
                setRows(res || []);
            },
        }
    );

    const handleDeleteSource = (record: any) => {
        messageForwardingApi
            .deleteForwardingRuleSource(ruleId, record.id)
            .then(async () => {
                message.success(`删除成功`);
                handleRefreshSourcesList();
            })
            .catch(async (ex) => {
                message.error(ex.message);
            });
    };

    const columns = [
        {
            title: '数据源名称',
            dataIndex: 'name',
            width: 250,
        },
        {
            title: '数据源名称描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <Button
                            type={`link`}
                            onClick={() =>
                                navigate(
                                    RoutesConstants.MESSAGE_SOURCE_DETAIL.path(
                                        text
                                    )
                                )
                            }
                        >
                            查看
                        </Button>
                        {!rule?.enabled && (
                            <Popconfirm
                                title={`确定删除吗？`}
                                onConfirm={() => handleDeleteSource(record)}
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
            handleQuerySourcesList();
        }
    }, [ruleId]);

    useEffect(() => {
        setDisabled(_.size(rows) > 0 || sourcesLoading);
    }, [rows, sourcesLoading]);

    return (
        <>
            <GridTable
                toolbar={
                    <TableToolbar
                        extra={[
                            <SourceLinkForm
                                key={`link-btn`}
                                ruleId={ruleId}
                                onRefresh={handleRefreshSourcesList}
                            >
                                <Button type={`primary`} disabled={disabled}>
                                    关联数据源
                                </Button>
                            </SourceLinkForm>,
                        ]}
                    />
                }
                fit={true}
                size={`small`}
                columns={columns}
                dataSource={rows}
                loading={sourcesLoading}
                rowKey={`id`}
                pagination={false}
            />
        </>
    );
};
