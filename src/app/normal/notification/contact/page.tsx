import styles from './contact.module.less';
import { Tabs } from 'antd';
import { Contacts } from './contacts';
import { ContactGroups } from './contact-groups';

export const ContactPage = () => {
    return (
        <div className={styles.contactPage}>
            <Tabs
                style={{ backgroundColor: 'white', padding: 8 }}
                defaultActiveKey="1"
                items={[
                    {
                        label: '联系人',
                        key: '1',
                        children: <Contacts />,
                    },
                    {
                        label: '联系人组',
                        key: '2',
                        children: <ContactGroups />,
                    },
                ]}
            />
        </div>
    );
};
