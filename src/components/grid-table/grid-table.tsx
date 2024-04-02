import { Table, TableProps } from 'antd';
import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { genGridTableStyle } from './styles';
import { useCssInJs } from '@trionesdev/antd-react-ext';

export type GridTableProps = TableProps<any> & {
    /**
     * @description 是否撑满外部容器
     * @default false
     */
    fit?: boolean;
    /**
     * @description 是否展示返回icon
     * @default
     */
    toolbar?: React.ReactNode;
};

const GridTable: FC<GridTableProps> = (
    { fit = false, toolbar, style, ...props },
    context
) => {
    const tableRef = React.useRef<HTMLDivElement>(null);
    const tableContainerHeightRef = useRef(0);
    const tableContainerWidthRef = useRef(0);
    const tableHeaderHeightRef = useRef(0);
    const tableBodyHeightRef = useRef(0);
    const tableBodyWidthRef = useRef(0);

    const [scrollY, setScrollY] = useState(false);

    const prefixCls = 'ant-grid-table';
    const { hashId, wrapSSR } = useCssInJs({
        prefix: prefixCls,
        styleFun: genGridTableStyle,
    });

    const resizeObserverTableContainer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const { target, contentRect } = entry;
            const { height, width } = contentRect;
            // console.log("container height:", height)
            // console.log("container width:", width)

            if (height > 0) {
                tableContainerHeightRef.current = height;
            }
            if (width > 0) {
                tableContainerWidthRef.current = width;
            }

            if (width < tableBodyWidthRef.current) {
                if (
                    height <
                    tableHeaderHeightRef.current +
                        tableBodyHeightRef.current +
                        17
                ) {
                    setScrollY(true);
                } else {
                    setScrollY(false);
                }
            } else {
                if (
                    height <
                    tableHeaderHeightRef.current + tableBodyHeightRef.current
                ) {
                    setScrollY(true);
                } else {
                    setScrollY(false);
                }
            }
        }
    });

    const resizeObserverTableHeader = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const { target, contentRect } = entry;
            const { height } = contentRect;
            // console.log("header height:", height)
            if (height > 0) {
                tableHeaderHeightRef.current = height;
            }
        }
    });

    const resizeObserverTableBody = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const { target, contentRect } = entry;
            const { height, width } = contentRect;
            // console.log("body height:", height)
            // console.log("body width:", width)
            if (height > 0) {
                tableBodyHeightRef.current = height;
            }
            if (width > 0) {
                tableBodyWidthRef.current = width;
            }
        }
    });

    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // 处理每个变化的具体逻辑
            console.log('发生了变化:', mutation);
            const hasFixedRight = tableRef.current?.querySelector(
                '.ant-table-has-fix-right'
            ) as HTMLDivElement;
            if (hasFixedRight) {
                console.log('=====hasFixedRight:', true);
                const fixedHeader = tableRef.current?.querySelector(
                    '.ant-table-container .ant-table-thead'
                ) as HTMLDivElement;
                const fixedBody = tableRef.current?.querySelector(
                    '.ant-table-container .ant-table-tbody'
                ) as HTMLDivElement;
                debugger;
                resizeObserverTableHeader.observe(fixedHeader);
                resizeObserverTableBody.observe(fixedBody);
            } else {
                console.log('====hasFixedRight:', false);
            }
        });
    });

    useEffect(() => {
        const containerEl = tableRef.current!.querySelector(
            '.ant-table-container'
        ) as HTMLDivElement;
        resizeObserverTableContainer.observe(containerEl);
        mutationObserver.observe(containerEl, {
            childList: true,
            subtree: true,
        });
    }, []);

    return wrapSSR(
        <div
            ref={tableRef}
            style={style}
            className={classNames(
                prefixCls,
                hashId,
                fit ? 'ant-table-fill' : null
            )}
        >
            <>
                {toolbar}
                <Table
                    {...props}
                    scroll={
                        fit
                            ? _.assign(
                                  {},
                                  props.scroll,
                                  scrollY ? { y: true } : {}
                              )
                            : props.scroll
                    }
                />
            </>
        </div>
    );
};
export default Object.assign(GridTable, {
    Column: Table.Column,
    ColumnGroup: Table.ColumnGroup,
});
