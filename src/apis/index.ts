import AlarmApi from './alarm/alarm.api'
import AssetsApi from './assets/assets.api'
import DeviceApi from './device/device.api'
import OssApi from './oss/oss.api'

export const deviceApi = new DeviceApi()
export const assetsApi = new AssetsApi()
export const alarmApi = new AlarmApi()
export const ossApi = new OssApi()
