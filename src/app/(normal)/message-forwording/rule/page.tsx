import React, { FC } from 'react';
import { Tabs, TabsProps } from 'antd';
import styles from './messag-forwarding-rule.module.less';
import { MessageSourceTab } from '@/app/(normal)/message-forwording/rule/message-source-tab';
import { MessageSinkTab } from '@/app/(normal)/message-forwording/rule/message-sink-tab';
import { ForwardingRuleTab } from '@/app/(normal)/message-forwording/rule/forwarding-rule-tab';

export const ForwardingRulePage: FC = () => {
    const items: TabsProps['items'] = [
        {
            key: 'rules',
            label: '规则',
            children: <ForwardingRuleTab />,
        },
        {
            key: 'message-source',
            label: '数据源',
            children: <MessageSourceTab />,
        },
        {
            key: 'message-sink',
            label: '数据目的',
            children: <MessageSinkTab />,
        },
    ];

    return (
        <div className={styles.rulesPage}>
            <Tabs rootClassName={styles.rulesPageTabs} items={items} />
        </div>
    );
};
