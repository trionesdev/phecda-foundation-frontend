import DeviceApi from '@apis/device/device.api';
import { DeviceDataApi } from '@apis/device/device-data.api';
import { DriverApi } from '@apis/device/driver.api';

export const deviceApi = new DeviceApi();
export const driverApi = new DriverApi();
export const deviceDataApi = new DeviceDataApi();
