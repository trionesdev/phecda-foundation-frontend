import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genSearchToolbarStyle = (
    prefixCls: string,
    token: GlobalToken
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            [`&-col-hidden`]: {
                display: 'none',
            },
        },
    };
};
