import {FC} from "react";
import {dictionaryApi} from "@apis/boss";
import {FetchSelect} from "@trionesdev/antd-react-ext";

type DictionaryTypeSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const DictionaryTypeSelect: FC<DictionaryTypeSelectProps> = ({value, onChange}) => {
    return <FetchSelect fetchRequest={() => {
        return dictionaryApi.queryDictionaryList({type: 'GROUP'})
    }} fieldNames={{value: 'code', label: 'name'}} value={value} onChange={onChange}/>
}