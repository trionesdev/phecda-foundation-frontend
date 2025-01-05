import {StandAloneLayout} from "@app/layout/StandAloneLayout.tsx";
import {TrionesLayout} from "@app/layout/TrionesLayout.tsx";
import {useAppConfig} from "@components/app-config";


export const AppLayout = () => {
    const appConfig = useAppConfig()
    return <>
        {appConfig.subApp ? <TrionesLayout/> : <StandAloneLayout/>}
    </>
}