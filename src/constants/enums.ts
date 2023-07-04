/**
 * 设备状态（资产）
 */
export enum ASSETS_STATES {
    /**报废 */
    SCRAPPED = 'SCRAPPED',
    /**停用 */
    SHUTDOWN = 'SHUTDOWN',
    /** 停机维修 */
    SHUTDOWN_FOR_REPAIR = 'SHUTDOWN_FOR_REPAIR',
    /** 带病运行 */
    OPERATION_WITH_FAULTS = 'OPERATION_WITH_FAULTS',
    /** 正常运行 */
    NORMAL_OPERATION = 'NORMAL_OPERATION',
}
