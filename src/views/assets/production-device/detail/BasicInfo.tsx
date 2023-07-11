import { Image } from 'antd';
import FormInfo from '@/components/form-info';
import { formatDateTime } from '@/commons/util/date.utils';
import { AssetsStatesConfig } from '@/constants/consts';
import { ASSETS_STATES } from '@/constants/enums';
import UploadMyFile from '@/components/upload/UploadFile';
import { OptionsType } from '@/constants/types';
import { findOptionsLabel } from '@/commons/util/findOptionsLabel';

const BasicInfo: React.FC<{
    data: Record<string, any>;
    assetsTypeOptions: OptionsType[];
    locationCodeOptions: OptionsType[];
}> = ({ data, assetsTypeOptions, locationCodeOptions }) => {
    return (
        <>
            <FormInfo
                title="设备信息"
                data={[
                    {
                        label: '设备名称',
                        value: data?.name,
                    },
                    {
                        label: '规格型号',
                        value: data?.specification,
                    },
                    {
                        label: '区域位置',
                        value: findOptionsLabel(
                            locationCodeOptions,
                            data?.locationCode
                        ),
                    },
                    {
                        label: '设备类型',
                        value: findOptionsLabel(
                            assetsTypeOptions,
                            data?.typeCode
                        ),
                    },
                    {
                        label: '备注',
                        value: data?.remark,
                    },
                ]}
            />
            <FormInfo
                title="使用情况"
                data={[
                    {
                        label: '当前状态',
                        value: AssetsStatesConfig?.[
                            data?.state as ASSETS_STATES
                        ],
                    },
                    {
                        label: '使用部门',
                        value: data?.departmentCode,
                    },
                    {
                        label: '负责岗位',
                        value: data?.postCode,
                    },
                    {
                        label: '启用日期',
                        value: formatDateTime(data?.createdAt),
                    },
                ]}
            />
            <FormInfo
                title="其他信息"
                column={1}
                data={[
                    {
                        label: '设备图片',
                        value: data?.images?.map((item: any) => {
                            return (
                                <Image
                                    width={200}
                                    key={item?.uid}
                                    src={item?.url}
                                />
                            );
                        }),
                    },
                    {
                        label: '相关文档',
                        value: <UploadMyFile readonly fileList={data?.files} />,
                    },
                ]}
            />
        </>
    );
};
export default BasicInfo;
