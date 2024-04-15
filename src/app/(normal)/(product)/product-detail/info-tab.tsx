import styles from './product-detail.module.less';
import { Descriptions } from 'antd';
import { FC } from 'react';
import _ from 'lodash';
import { formatDateTime } from '../../../../commons/util/date.utils';
import { DeviceNodeType } from '@/app/(normal)/(product)/internal/device.constants';

type InfoTabProps = {
    product: any;
};
const InfoTab: FC<InfoTabProps> = ({ product }) => {
    return (
        <div className={styles.infoTab}>
            <Descriptions title={`产品信息`}>
                <Descriptions.Item label={`产品名称`}>
                    {_.get(product, 'name', '')}
                </Descriptions.Item>
                <Descriptions.Item label={`节点类型`}>
                    {_.get(DeviceNodeType, product?.nodeType)}
                </Descriptions.Item>
                <Descriptions.Item label={`产品标识`}>
                    {_.get(product, 'id', '')}
                </Descriptions.Item>
                <Descriptions.Item label={`创建时间`}>
                    {formatDateTime(_.get(product, 'createdAt'))}
                </Descriptions.Item>
                <Descriptions.Item label={`物模型版本`}>
                    {_.get(product, 'thingModelVersion', '')}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};
export default InfoTab;
