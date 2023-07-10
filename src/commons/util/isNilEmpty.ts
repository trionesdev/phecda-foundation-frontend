import _ from 'lodash';

/**
 * 如果是 null undefined {} [] "" 则返回 true  其他都是 false
 * @param value
 * @returns {boolean}
 */
export const isNilEmpty = (
    value: any
): value is null | undefined | '' | Record<string, never> | [] => {
    if (_.isString(value)) {
        return value.length === 0;
    }
    if (_.isObject(value)) {
        return _.isEmpty(Object.keys(value));
    }
    if (_.isArray(value)) {
        return _.isEmpty(value.length);
    }
    return _.isNil(value);
};
