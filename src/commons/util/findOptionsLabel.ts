import { OptionsType } from '@/constants/types';
import _ from 'lodash';

/**
 *
 * @param options OptionsType
 * @param value any
 * @returns
 */
export const findOptionsLabel = (options: OptionsType[], value: any) => {
    return _.find(options, { value })?.label ?? value;
};
