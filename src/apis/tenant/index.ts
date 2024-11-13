import AssetsApi from '@apis/tenant/assets/assets.api.ts';
import LoggingApi from '@apis/tenant/logging/logging.api.ts';
import OperationApi from '@apis/tenant/operation/operation.api.ts';
import SystemApi from '@apis/tenant/system/system.api.ts';

export * from '@apis/tenant/device';

/** 资产管理 */
export const assetsApi = new AssetsApi();


/** 系统设置 */
export const systemApi = new SystemApi();
/** 监控运维 */
export const operationApi = new OperationApi();

/** 日志 */
export const loggingApi = new LoggingApi();



export * from "./oss"
export * from "./alarm"
export * from "./edge"
export * from "./message-forwarding"
export * from "./notification"