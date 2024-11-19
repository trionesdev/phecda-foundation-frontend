import {
    GridTable,
    Layout,
    PageHeader,
    TableToolbar,
} from '@trionesdev/antd-react-ext';
import {useEffect, useState} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import styles from './source-detail.module.less';
import {useNavigate, useParams} from 'react-router-dom';
import {useRequest} from 'ahooks';
import {messageForwardingApi} from '@apis/tenant';
import _ from 'lodash';
import {
    MESSAGE_TYPE
} from '@/app/normal/message-forwarding/internal/message-forwarding.enums';
import {TopicForm} from '@/app/normal/message-forwarding/source-detail/topic-form';

export const MessageSourceDetailPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [source, setSource] = useState<any>();
    const [rows, setRows] = useState([]);

    const {run: handleQuerySourceById} = useRequest(
        () => messageForwardingApi.querySourceById(id!),
        {
            manual: true,
            onSuccess: (res: any) => {
                setSource(res);
            },
        }
    );

    const {
        run: handleQueryTopics,
        refresh: handleRefreshTopics,
        loading: topicsLoading,
    } = useRequest(() => messageForwardingApi.querySourceTopicsList(id!), {
        manual: true,
        onSuccess: (res: any) => {
            setRows(res || []);
        },
    });

    const columns = [
        {
            title: '消息类型',
            dataIndex: [`properties`, `type`],
            width: 150,
            render: (text: string) => {
                switch (text) {
                    case MESSAGE_TYPE.THING_PROPERTY_REPORT:
                        return '物模型属性上报';
                    default:
                        return '未知';
                }
            },
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
        },
        {
            title: 'ProductKey',
            dataIndex: [`properties`, `productKey`],
            width: 200,
        },
        {
            title: `deviceName`,
            dataIndex: [`properties`, `deviceName`],
            width: 200,
            render: (text: string) => {
                if (_.isEqual('+', text)) {
                    return '全部设备(+)';
                }
                return text;
            },
        },
        {
            title: `操作`,
            dataIndex: `id`,
            width: 100,
            render: (text: string) => {
                return (
                    <Space>
                        <Popconfirm
                            title={`确定要从数据源中删除该Topic吗？`}
                            onConfirm={() => {
                                messageForwardingApi
                                    .deleteSourceTopicById(id!, text)
                                    .then(() => {
                                        handleRefreshTopics();
                                    });
                            }}
                        >
                            <Button size={`small`} type={`link`} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        if (id) {
            handleQuerySourceById();
            handleQueryTopics();
        }
    }, [id]);

    return (
        <Layout direction={`vertical`} className={styles.sourceDetail}>
            <Layout.Item>
                <PageHeader title={source?.name} onBack={() => navigate(-1)}/>
            </Layout.Item>
            <Layout.Item auto={true}>
                <GridTable
                    toolbar={
                        <TableToolbar
                            extra={<Space>
                                <TopicForm
                                    sourceId={id!}
                                    onRefresh={handleRefreshTopics}
                                >
                                    <Button type={`primary`}>创建Topic</Button>
                                </TopicForm>
                            </Space>}
                        />
                    }
                    fit={true}
                    size={`small`}
                    loading={topicsLoading}
                    columns={columns}
                    dataSource={rows}
                    rowKey={`id`}
                    pagination={false}
                />
            </Layout.Item>
        </Layout>
    );
};
