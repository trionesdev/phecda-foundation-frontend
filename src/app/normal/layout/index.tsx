import {StandAloneLayout} from "@app/normal/layout/StandAloneLayout.tsx";
import {TrionesLayout} from "@app/normal/layout/TrionesLayout.tsx";
import {useAppConfig} from "@components/app-config";

export const NormalLayout = () => {
    const appConfig = useAppConfig()
    return <>
        {appConfig.subApp ? <TrionesLayout/> : <StandAloneLayout/>}
    </>
}