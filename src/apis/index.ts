import AlarmApi from './alarm/alarm.api';
import AssetsApi from './assets/assets.api';
import LoggingApi from './logging/logging.api';
import OperationApi from './operation/operation.api';
import OssApi from './oss/oss.api';
import SystemApi from './system/system.api';
import NodeApi from '@apis/edge/node.api';
import MessageForwardingApi from '@apis/message-forwarding/message-forwarding.api';
import { NotificationApi } from '@apis/notification/notification.api';

export * from './device/index';

/** 资产管理 */
export const assetsApi = new AssetsApi();
/** 告警管理 */
export const alarmApi = new AlarmApi();
/** oss上传 */
export const ossApi = new OssApi();
/** 系统设置 */
export const systemApi = new SystemApi();
/** 监控运维 */
export const operationApi = new OperationApi();
/** 设备数据 */
// export const deviceDataApi = new DeviceDataApi();
/** 日志 */
export const loggingApi = new LoggingApi();
/** 边缘节点 */
export const nodeApi = new NodeApi();

export const messageForwardingApi = new MessageForwardingApi();

export const notificationApi = new NotificationApi();
