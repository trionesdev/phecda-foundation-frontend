import { FC } from 'react';
import { Descriptions } from 'antd';

type NodeInfoProps = {
    node: any;
};
const NodeInfo: FC<NodeInfoProps> = ({ node }) => {
    return (
        <div>
            <Descriptions title={`节点信息`}>
                <Descriptions.Item label={`节点名称`}>
                    {node?.name}
                </Descriptions.Item>
                <Descriptions.Item label={`节点标识`}>
                    {node?.identifier}
                </Descriptions.Item>
                <Descriptions.Item label={`备注`}>
                    {node?.remark}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};
export default NodeInfo;
