import {Select, SelectProps} from "antd";
import {FC, useEffect, useState} from "react";
import {deviceApi} from "@apis";

type  ValueTypeSelectProps = {} & Omit<SelectProps, 'options'>
const ValueTypeSelect: FC<ValueTypeSelectProps> = ({
                                                       ...rest
                                                   }) => {

    const [options, setOptions] = useState([])

    const handleQueryOptions = () => {
        deviceApi.valueTypeOptions().then((res: any) => {
            setOptions(res)
        })
    }
    useEffect(() => {
        handleQueryOptions()
    }, [])
    return <Select options={options} {...rest}/>
}
export default ValueTypeSelect