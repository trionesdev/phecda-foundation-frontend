import {RolesPanel} from "@app/normal/org/roles/RolesPanel.tsx";
import {RoleMembersPanel} from "@app/normal/org/roles/RoleMembersPanel.tsx";
import styles from "./roles.module.less"
import {useState} from "react";
import {Empty, Splitter} from "antd";

export const RolesPage = () => {
    const [selectedRole, setSelectedRole] = useState<any | undefined>()

    return <Splitter  className={styles.orgStructure}>
        <Splitter.Panel className={styles.departmentPanel} defaultSize={250} min={200} max={300} >
            <RolesPanel onRoleChange={setSelectedRole}/>
        </Splitter.Panel>
        <Splitter.Panel className={styles.membersPanel}>
            {selectedRole ? <RoleMembersPanel role={selectedRole}/> : <Empty style={{padding: 20}}/>}
        </Splitter.Panel>
    </Splitter>
}