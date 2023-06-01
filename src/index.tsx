import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.less';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AppRoutes from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <AppRoutes />
    </ConfigProvider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
