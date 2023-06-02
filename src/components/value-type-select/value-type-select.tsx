import {Select, SelectProps} from "antd";
import {FC, useEffect, useState} from "react";
import {deviceApi} from "@apis";

type  ValueTypeSelectProps = {
    defaultFirstOption?: boolean
} & Omit<SelectProps, 'options'>
const ValueTypeSelect: FC<ValueTypeSelectProps> = ({
                                                       defaultFirstOption = true,
                                                       ...rest
                                                   }) => {
    const [defaultValue, setDefaultValue] = useState(rest.defaultValue)
    const [options, setOptions] = useState([])

    const handleQueryOptions = () => {
        deviceApi.valueTypeOptions().then((res: any) => {
            setOptions(res || [])
            // debugger
            // if (defaultFirstOption && !defaultValue) {
            //     setDefaultValue(_.get(res, [0, 'value']))
            // }
        })
    }
    useEffect(() => {
        handleQueryOptions()
    }, [])
    return <Select defaultValue={'INT'} options={options} {...rest}/>
}
export default ValueTypeSelect