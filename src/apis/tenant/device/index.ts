import DeviceApi from '@apis/tenant/device/device.api.ts';
import { DeviceDataApi } from '@apis/tenant/device/device-data.api.ts';
import { DriverApi } from '@apis/tenant/device/driver.api.ts';

export const deviceApi = new DeviceApi();
export const driverApi = new DriverApi();
export const deviceDataApi = new DeviceDataApi();
