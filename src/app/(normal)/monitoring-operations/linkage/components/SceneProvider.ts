import { FormInstance } from 'antd';
import { createContext, useContext } from 'react';

interface SceneContextValue {
    sceneForm: FormInstance<any>;
    [key: string]: any;
}

const SceneContext = createContext<SceneContextValue>({} as SceneContextValue);

export const SceneContextProvider = SceneContext.Provider;
export const useSceneContext = (): SceneContextValue =>
    useContext(SceneContext);
