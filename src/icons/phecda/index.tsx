import Icon from '@ant-design/icons';
import { ReactComponent as DashboardSvg } from './svg/Dashboard.svg';
import { ReactComponent as DeviceSvg } from './svg/DeviceManagement.svg';
import { ReactComponent as MessageForwardingSvg } from './svg/MessageForwarding.svg';
import { ReactComponent as MonitoringSvg } from './svg/Monitoring.svg';
import { ReactComponent as AlarmSvg } from './svg/Alarm.svg';
import { ReactComponent as NotificationSvg } from './svg/Notification.svg';

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
