import AlarmApi from './alarm/alarm.api';
import AssetsApi from './assets/assets.api';
import DeviceApi from './device/device.api';
import LoggingApi from './logging/logging.api';
import OperationApi from './operation/operation.api';
import OssApi from './oss/oss.api';
import SystemApi from './system/system.api';
import DeviceDataApi from '@apis/alarm/device-data.api';
import NodeApi from '@apis/edge/node.api';

/** 设备管理 */
export const deviceApi = new DeviceApi();
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
export const deviceDataApi = new DeviceDataApi();
/** 日志 */
export const loggingApi = new LoggingApi();
/** 边缘节点 */
export const nodeApi = new NodeApi();
