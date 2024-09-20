import { createRoot } from 'react-dom/client'
import './index.css';
import './index.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { AppRouter } from '@/router';

createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={zhCN}>
        <AppRouter />
    </ConfigProvider>
)
