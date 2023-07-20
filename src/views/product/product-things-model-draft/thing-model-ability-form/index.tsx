import { FC, useEffect, useState } from 'react';
import {
    Button,
    ButtonProps,
    Form,
    FormInstance,
    Radio,
    RadioChangeEvent,
    message,
} from 'antd';
import ThingModelPropertyForm from './thing-model-property-form';
import _ from 'lodash';
import { deviceApi } from '@apis';
import ThingModelServiceForm from './thing-model-service-form';
import ThingModelEventForm from './thing-model-event-form';
import DrawerForm from '@/components/drawer-form';

export enum AbilityType {
    PROPERTY = 'PROPERTY',
    SERVICE = 'SERVICE',
    EVENT = 'EVENT',
}

type ThingsModelAbilityEditBtnProps = {
    productId: string;
    editAbilityType?: AbilityType;
    identifier?: string;
    onSuccess?: () => void;
} & ButtonProps;

const ABILITY_TYPE_CONFIG = {
    [AbilityType.PROPERTY]: <ThingModelPropertyForm />,
    [AbilityType.SERVICE]: <ThingModelServiceForm />,
    [AbilityType.EVENT]: <ThingModelEventForm />,
};

const ThingModelAbilityForm: FC<ThingsModelAbilityEditBtnProps> = ({
    productId,
    editAbilityType,
    identifier,
    onSuccess,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const [abilityType, setAbilityType] = useState(
        editAbilityType || AbilityType.PROPERTY
    );
    const [formValues, setFormValues] = useState<any>();

    const handleAbilityTypeChange = (e: RadioChangeEvent) => {
        setAbilityType(e.target.value);
    };

    const handleSubmit = (values: any) => {
        let data = _.assign(values, { identifier: identifier });
        deviceApi
            .upsertThingModelDraft(productId, data)
            .then(() => {
                setOpen(false);
                onSuccess?.();
                message.success('保存成功');
            })
            .catch(() => {});
    };

    const handleQueryThingModel = () => {
        deviceApi.queryProductThingModelDraft(productId).then((res: any) => {
            const ability: any = _.values(_.get(res, 'thingModel'))
                .reduce((prev, cur) => _.concat(prev, cur), [])
                .find((ability: any) => {
                    return _.isEqual(ability.identifier, identifier);
                });
            let typeAbility = {};
            switch (abilityType) {
                case AbilityType.PROPERTY:
                    typeAbility = { property: ability };
                    break;
                case AbilityType.EVENT:
                    typeAbility = { event: ability };
                    break;
                case AbilityType.SERVICE:
                    typeAbility = { service: ability };
                    break;
                default:
                    break;
            }
            setFormValues(
                _.assign({}, typeAbility, { abilityType: abilityType })
            );
        });
    };

    useEffect(() => {
        if (open && identifier) {
            handleQueryThingModel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [abilityType, identifier, open]);

    return (
        <DrawerForm
            title={`${identifier ? '编辑' : '新建'}功能定义`}
            layout={`vertical`}
            trigger={<Button {...rest} />}
            open={open}
            onOpenChange={(open) => setOpen(open)}
            initialValues={{ abilityType: abilityType }}
            formValues={formValues}
            onSubmit={handleSubmit}
        >
            <Form.Item
                label={`功能类型`}
                name={`abilityType`}
                rules={[{ required: true }]}
            >
                <Radio.Group
                    onChange={handleAbilityTypeChange}
                    disabled={Boolean(identifier)}
                >
                    <Radio.Button value={AbilityType.PROPERTY}>
                        属性
                    </Radio.Button>
                    <Radio.Button value={AbilityType.SERVICE}>
                        服务
                    </Radio.Button>
                    <Radio.Button value={AbilityType.EVENT}>事件</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                noStyle
                dependencies={['abilityType']}
                rules={[{ required: true }]}
            >
                {({ getFieldValue }) => {
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
