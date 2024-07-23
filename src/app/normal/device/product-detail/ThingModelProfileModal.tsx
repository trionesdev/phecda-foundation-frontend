import { FC, useEffect, useState } from 'react';
import { Button, message, Modal, Tabs } from 'antd';
import { useRequest } from 'ahooks';
import { deviceApi } from '@apis';
import { CodeEditor } from '@components';

type ThingModelProfileModalProps = {
    id?: string;
};
export const ThingModelProfileModal: FC<ThingModelProfileModalProps> = ({
    id,
}) => {
    const [open, setOpen] = useState(false);
    const [thingModelProfile, setThingModelProfile] = useState<any>();

    const { run: handleQueryProductThingModelProfile } = useRequest(
        () => {
            return deviceApi.queryProductThingModelProfile(id!);
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                setThingModelProfile(res);
            },
            onError: async (err: any) => {
                message.error(err.message);
            },
        }
    );

    useEffect(() => {
        if (open && id) {
            handleQueryProductThingModelProfile();
        }
    }, [open, id]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>物模型TSL</Button>
            <Modal
                open={open}
                title={'查看物模型'}
                width={800}
                styles={{ body: { height: 500 } }}
                onCancel={() => setOpen(false)}
                destroyOnClose={true}
                footer={null}
            >
                <Tabs
                    items={[
                        {
                            label: 'Json',
                            key: 'json',
                            children: (
                                <div style={{ height: '100%' }}>
                                    <CodeEditor
                                        value={thingModelProfile?.json}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: 'Yaml',
                            key: 'yaml',
                            children: (
                                <div style={{ height: '100%' }}>
                                    <CodeEditor
                                        value={thingModelProfile?.yaml}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
