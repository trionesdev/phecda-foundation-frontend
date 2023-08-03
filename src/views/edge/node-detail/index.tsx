import { PageHeader, VPanel } from '@moensun/antd-react-ext';
import { message, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import styles from './node-detail.module.less';
import NodeInfo from '@views/edge/node-detail/node-info';
import NodeApplication from '@views/edge/node-detail/node-application';
import NodeChildDevice from '@views/edge/node-detail/node-child-device';
import { nodeApi } from '@apis';

const NodeDetailView = () => {
    const { id } = useParams();
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
            children: <NodeInfo node={node} />,
        },
        {
            key: `app`,
            label: `应用管理`,
            children: <NodeApplication node={node} />,
        },
        {
            key: `sub-device`,
            label: `子设备管理`,
            children: <NodeChildDevice node={node} />,
        },
    ]);

    const pageHelper = (
        <PageHeader
            title={'节点详情'}
            onBack={() => {
                navigate(-1);
            }}
        />
    );
    return (
        <VPanel className={styles.nodeDetailView} header={pageHelper}>
            <Tabs items={items} />
        </VPanel>
    );
};
export default NodeDetailView;
