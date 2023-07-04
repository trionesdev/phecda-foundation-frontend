import { ASSETS_STATES } from './enums'

export const AssetsStatesConfig = {
    [ASSETS_STATES.SCRAPPED]: '报废',
    [ASSETS_STATES.SHUTDOWN]: '停用',
    [ASSETS_STATES.SHUTDOWN_FOR_REPAIR]: '停机维修',
    [ASSETS_STATES.OPERATION_WITH_FAULTS]: '带病运行',
    [ASSETS_STATES.NORMAL_OPERATION]: '正常运行',
}
export const AssetsStatesOptions = [
    {
        label: '报废',
        value: ASSETS_STATES.SCRAPPED,
    },
    {
        label: '停用',
        value: ASSETS_STATES.SHUTDOWN,
    },
    {
        label: '停机维修',
        value: ASSETS_STATES.SHUTDOWN_FOR_REPAIR,
    },
    {
        label: '带病运行',
        value: ASSETS_STATES.OPERATION_WITH_FAULTS,
    },
    {
        label: '正常运行',
        value: ASSETS_STATES.NORMAL_OPERATION,
    },
]
