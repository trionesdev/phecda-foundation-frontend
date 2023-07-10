import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'qs';

type SearchParams = Record<string, string>;

export const useGetSearch = <T extends Record<string, any>>(): T => {
    const location = useLocation();

    useEffect(() => {
        const search = location.search.slice(1); // 去掉问号

        const parsedParams = queryString.parse(search);
        const params: SearchParams = {};

        for (const key in parsedParams) {
            if (parsedParams.hasOwnProperty(key)) {
                params[key] = parsedParams[key] as string;
            }
        }

        setParams(params);
    }, [location.search]);

    const [params, setParams] = useState<SearchParams>({});

    return params as T;
};
