import { LinkageSceneEventOptions } from '@/app/normal/linkage/internal/linkage.constants';
import { Form, Select } from 'antd';
import React, { FC } from 'react';

type SceneEventTypeFormItemProps = {
    namePath?: any;
};
export const SceneEventTypeFormItem: FC<SceneEventTypeFormItemProps> = ({
    namePath,
}) => {
    return (
        <Form.Item name={namePath} label={`场景事件类型`} required={true}>
            <Select
                style={{ width: 180 }}
                options={LinkageSceneEventOptions}
                placeholder="场景事件类型"
            />
        </Form.Item>
    );
};
