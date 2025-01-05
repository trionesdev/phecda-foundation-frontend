import {useState} from "react";
import {Empty, Splitter} from "antd";
import styles from "./org-structure.module.less"
import {DepartmentMembersPanel} from "./DepartmentMembersPanel.tsx";
import {DepartmentsPanel} from "@app/normal/org/org-structure/DepartmentsPanel.tsx";

export const OrgStructurePage = () => {

    const [department, setDepartment] = useState<any>()

    return <Splitter  className={styles.orgStructure}>
        <Splitter.Panel className={styles.departmentPanel} defaultSize={250} min={200} max={300} >
            <DepartmentsPanel onDepartmentChange={setDepartment}/>
        </Splitter.Panel>
        <Splitter.Panel className={styles.membersPanel}>
            {!department ? <Empty style={{padding: 20}}/> : <DepartmentMembersPanel department={department}/>}
        </Splitter.Panel>
    </Splitter>
}