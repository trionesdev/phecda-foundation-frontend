import { VPanel } from '@moensun/antd-react-ext';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Divider, Form, Input, message, Popconfirm, Space } from 'antd';
import { nodeApi } from '@apis';
import { Link } from 'react-router-dom';
import { RoutesConstants } from '../../../router/routes.constants';
import GridTable from '@components/grid-table';
import SearchToolbar from '@components/search-toolbar';
import NodeFormBtn from '@views/edge/node/node-form-btn';

const NodeView: FC = () => {
    const [querySeq, setQuerySeq] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});

    const handleQueryData = () => {
        let params = {
            ...formData,
            pageNum,
            pageSize,
        };
        setLoading(true);
        nodeApi
            .page(params)
            .then((res: any) => {
                if (res) {
                    setRows(res.rows || []);
                    setTotal(res?.total || 0);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteById = (id: string) => {
        nodeApi.deleteById(id).then(async () => {
            handleRefresh();
            message.success('操作成功');
        });
    };

    const handleRefresh = () => {
        setQuerySeq(querySeq + 1);
    };

    useEffect(() => {
        handleQueryData();
    }, [formData, querySeq, pageNum, pageSize]);

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '标识',
            dataIndex: 'identifier',
        },
        {
            title: `备注`,
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 225,
            render: (text: string, record: any) => {
                return (
                    <Space split={<Divider type={`vertical`} />}>
                        <NodeFormBtn
                            key={`edit-btn`}
                            type="link"
                            size={`small`}
                            isEdit
                            initValue={record}
                            onSuccess={handleRefresh}
                        >
                            编辑
                        </NodeFormBtn>
                        <Button key={`view-btn`} size={`small`} type={`link`}>
                            <Link to={RoutesConstants.NODE_DETAIL.path(text)}>
                                查看
                            </Link>
                        </Button>
                        <Popconfirm
                            key={`del-btn`}
                            title={`确定删除节点 ${record.name}？`}
                            onConfirm={() => handleDeleteById(text)}
                        >
                            <Button size={`small`} type={`link`} danger={true}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const searchForm = useMemo(() => {
        return (
            <>
                <Form.Item name="name" label="名称">
                    <Input allowClear />
                </Form.Item>
            </>
        );
    }, []);

    const tableBar = (
        <SearchToolbar
            formItems={searchForm}
            onSearch={(values) => {
                setFormData(values);
            }}
            addButtons={
                <NodeFormBtn
                    key={`create-btn`}
                    type={`primary`}
                    onSuccess={handleRefresh}
                >
                    新建节点
                </NodeFormBtn>
            }
        />
    );
    return (
        <VPanel>
            <GridTable
                style={{ padding: '8px', backgroundColor: 'white' }}
                fit={true}
                size={`small`}
                toolbar={tableBar}
                columns={columns}
                scroll={{ y: 'max-content' }}
                dataSource={rows}
                rowKey={`id`}
                loading={loading}
            />
        </VPanel>
    );
};
export default NodeView;
