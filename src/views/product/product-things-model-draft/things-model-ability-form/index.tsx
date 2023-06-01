import {DrawerForm} from "@moensun/antd-react-ext";
import {FC, useState} from "react";
import {Button, ButtonProps, Form, Input, Radio, RadioChangeEvent} from "antd";
import ThingsModelPropertyForm from "./things-model-property-form";
import _ from "lodash";

enum AbilityType {
    PROPERTY = "PROPERTY",
    SERVICE = "SERVICE",
    EVENT = "EVENT"
}

type ThingsModelAbilityEditBtnProps = {
    abilityId?: string
} & ButtonProps
const ThingsModelAbilityForm: FC<ThingsModelAbilityEditBtnProps> = ({
                                                                        abilityId,
                                                                        ...rest
                                                                    }) => {
    const [abilityType, setAbilityType] = useState(AbilityType.PROPERTY)
    const [formValues, setFormValues] = useState()

    const handleAbilityTypeChange = (e: RadioChangeEvent) => {
        setAbilityType(e.target.value)
    }

    return <DrawerForm title={`${abilityId ? '修改' : "编辑"}功能定义`} layout={`vertical`}
                       trigger={<Button {...rest}/>} initialValues={{abilityType: abilityType}} formValues={formValues}>
        <Form.Item label={`功能类型`} name={`abilityType`}>
            <Radio.Group onChange={handleAbilityTypeChange}>
                <Radio.Button value={AbilityType.PROPERTY}>属性</Radio.Button>
                <Radio.Button value={AbilityType.SERVICE}>服务</Radio.Button>
                <Radio.Button value={AbilityType.EVENT}>事件</Radio.Button>
            </Radio.Group>
        </Form.Item>
        {_.isEqual(AbilityType.PROPERTY, abilityType) && <ThingsModelPropertyForm/>}
    </DrawerForm>
}
export default ThingsModelAbilityForm