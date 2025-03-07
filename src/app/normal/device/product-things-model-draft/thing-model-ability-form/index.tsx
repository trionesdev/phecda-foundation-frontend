import React, {FC, useEffect, useState} from 'react';
import {
    ButtonProps,
    Form,
    Radio,
    RadioChangeEvent,
    message,
} from 'antd';
import ThingModelPropertyForm from './thing-model-property-form';
import _ from 'lodash';
import {deviceApi} from '@apis/tenant';
import ThingModelCommandForm from './thing-model-command-form';
import ThingModelEventForm from './thing-model-event-form';
import {AbilityType} from '../../internal/device.enum';
import {DrawerForm} from "@trionesdev/antd-react-ext";

type ThingsModelAbilityEditBtnProps = {
    children?: React.ReactElement;
    productId: string;
    editAbilityType?: AbilityType;
    identifier?: string;
    onSuccess?: () => void;
} & ButtonProps;

const ABILITY_TYPE_CONFIG = {
    [AbilityType.PROPERTY]: <ThingModelPropertyForm/>,
    [AbilityType.COMMAND]: <ThingModelCommandForm/>,
    [AbilityType.EVENT]: <ThingModelEventForm/>,
};

const ThingModelAbilityForm: FC<ThingsModelAbilityEditBtnProps> = ({
                                                                       children,
                                                                       productId,
                                                                       editAbilityType,
                                                                       identifier,
                                                                       onSuccess
                                                                   }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [abilityType, setAbilityType] = useState(
        editAbilityType || AbilityType.PROPERTY
    );

    const handleAbilityTypeChange = (e: RadioChangeEvent) => {
        setAbilityType(e.target.value);
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            let data = _.assign(values, {identifier: identifier});
            deviceApi
                .upsertThingModelDraft(productId, data)
                .then(async () => {
                    setOpen(false);
                    onSuccess?.();
                    message.success('保存成功');
                })
                .catch(() => {
                });
        })
    };

    const handleQueryThingModel = () => {
        deviceApi.queryProductThingModelDraft(productId).then((res: any) => {
            const ability: any = _.values(res)
                .reduce((prev, cur) => _.concat(prev, cur), [])
                .find((ability: any) => {
                    return _.isEqual(ability.identifier, identifier);
                });
            let typeAbility = {};
            switch (abilityType) {
                case AbilityType.PROPERTY:
                    typeAbility = {property: ability};
                    break;
                case AbilityType.EVENT:
                    typeAbility = {event: ability};
                    break;
                case AbilityType.COMMAND:
                    typeAbility = {command: ability};
                    break;
                default:
                    break;
            }
            form.setFieldsValue(_.assign({}, typeAbility, {abilityType: abilityType}))
        });
    };

    useEffect(() => {
        if (open && identifier) {
            handleQueryThingModel();
        }
    }, [abilityType, identifier, open]);

    return (
        <DrawerForm
            title={`${identifier ? '编辑' : '新建'}功能定义`}
            trigger={children}
            open={open}
            onTriggerClick={() => setOpen(true)}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
            destroyOnClose={true}
            afterOpenChange={(o)=>{
                if (!o){
                    form.resetFields();
                }
            }}
            form={form}
            formProps={{layout: 'vertical', initialValues: {abilityType: abilityType}}}
            onSubmit={handleSubmit}
        >
            <Form.Item
                label={`功能类型`}
                name={`abilityType`}
                rules={[{required: true}]}
            >
                <Radio.Group
                    onChange={handleAbilityTypeChange}
                    disabled={Boolean(identifier)}
                >
                    <Radio.Button value={AbilityType.PROPERTY}>
                        属性
                    </Radio.Button>
                    <Radio.Button value={AbilityType.COMMAND}>
                        指令
                    </Radio.Button>
                    <Radio.Button value={AbilityType.EVENT}>事件</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                noStyle
                dependencies={['abilityType']}
                rules={[{required: true}]}
            >
                {({getFieldValue}) => {
                    const abilityType = getFieldValue(
                        'abilityType'
                    ) as AbilityType;
                    return ABILITY_TYPE_CONFIG?.[abilityType];
                }}
            </Form.Item>

            {/* {_.isEqual(AbilityType.PROPERTY, abilityType) && (
                <ThingModelPropertyForm />
            )}
            {_.isEqual(AbilityType.SERVICE, abilityType) && (
                <ThingModelServiceForm />
            )}
            {_.isEqual(AbilityType.EVENT, abilityType) && (
                <ThingModelEventForm />
            )} */}
        </DrawerForm>
    );
};
export default ThingModelAbilityForm;
