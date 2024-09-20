import Icon from '@ant-design/icons';
import DashboardSvg from './svg/Dashboard.svg?react';
import DeviceSvg from './svg/DeviceManagement.svg?react';
import MessageForwardingSvg from './svg/MessageForwarding.svg?react';
import MonitoringSvg from './svg/Monitoring.svg?react';
import AlarmSvg from './svg/Alarm.svg?react';
import NotificationSvg from './svg/Notification.svg?react';

export const DashboardIcon = () => {
    return <Icon component={DashboardSvg} />;
};

export const DeviceIcon = () => {
    return <Icon component={DeviceSvg} />;
};

export const MessageForwardingIcon = () => {
    return <Icon component={MessageForwardingSvg} />;
};

export const MonitoringIcon = () => {
    return <Icon component={MonitoringSvg} />;
};

export const AlarmIcon = () => {
    return <Icon component={AlarmSvg} />;
};

export const NotificationIcon = () => {
    return <Icon component={NotificationSvg} />;
};
