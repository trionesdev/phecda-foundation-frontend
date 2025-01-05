import {Layout, PageHeader} from '@trionesdev/antd-react-ext';
import {message, Tabs, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import _ from 'lodash';
import styles from './node-detail.module.less';
import {nodeApi} from '@apis/tenant';
import NodeInfo from './node-info';
import NodeApplication from './node-application';
import NodeDevice from './node-device';

const NodeDetailView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState();

    const getNode = () => {
        nodeApi
            .getById(id!)
            .then((res: any) => {
                setNode(res || {});
            })
            .catch(async (e) => {
                message.error(`${e.message}`);
            });
    };

    useEffect(() => {
        getNode();
    }, [id]);

    const items: TabsProps['items'] = _.concat([
        {
            key: 'info',
            label: `节点信息`,
            children: <NodeInfo node={node}/>,
        },
        {
            key: `app`,
            label: `应用管理`,
            children: <NodeApplication node={node}/>,
        },
        {
            key: `sub-device`,
            label: `子设备管理`,
            children: <NodeDevice node={node}/>,
        },
    ]);

    return (
        <Layout className={styles.nodeDetailView} direction={`vertical`}>
            <Layout.Item>
                <PageHeader
                    title={'节点详情'}
                    onBack={() => {
                        navigate(-1);
                    }}
                />
            </Layout.Item>
            <Layout.Item auto={true}>
                <Tabs items={items}/>
            </Layout.Item>
        </Layout>
    );
};
export default NodeDetailView;
