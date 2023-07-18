import React from 'react';
import { Divider } from 'antd';
import ConditionsFormList from './ConditionsFormList';
import ActionsFormList from './ActionsFormList';
import FilterConditionFormItem from './FilterConditionFormItem';

type SceneDefinitionType = {
    // name: NamePath;
};
const SceneDefinition: React.FC<SceneDefinitionType> = () => {
    return (
        <div>
            {/* 场景定义 filterCondition */}
            <FilterConditionFormItem />
            {/* 满足条件 conditions */}
            <ConditionsFormList />
            <Divider />
            {/* 场景动作 actions*/}
            <ActionsFormList />
        </div>
    );
};

export default SceneDefinition;
