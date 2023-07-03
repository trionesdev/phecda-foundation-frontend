import AlarmApi from './alarm/alarm.api'
import AssetsApi from './assets/assets.api'
import DeviceApi from './device/device.api'

export const deviceApi = new DeviceApi()
export const assetsApi = new AssetsApi()
export const alarmApi = new AlarmApi()
