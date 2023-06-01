import {Form, Select} from "antd";
import ValueTypeInt from "./value-type-int";
import ValueTypeSelect from "../../../../../components/value-type-select/value-type-select";
import {useState} from "react";
import _ from "lodash";
import ValueTypeBool from "./value-type-bool";

enum ValueTypeEnum {
    INT = "INT",
    FLOAT = "FLOAT",
    DOUBLE = "DOUBLE",
    BOOL = "BOOL",
    STRING = "STRING",
    STRUCT = "STRUCT",
    ARRAY = "ARRAY"
}

const ValueType = () => {
    const [valueType, setValueType] = useState()
    return <>
        <Form.Item label={`数据类型`} name={[`valueType`]}>
            <ValueTypeSelect onChange={(value) => setValueType(value)}/>
        </Form.Item>
        {_.isEqual(ValueTypeEnum.INT, valueType) && <ValueTypeInt/>}
        {_.isEqual(ValueTypeEnum.BOOL, valueType) && <ValueTypeBool/>}
    </>
}
export default ValueType