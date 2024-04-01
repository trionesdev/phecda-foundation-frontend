import { Card } from 'antd';
import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';

export const NodeTypeStatistics = () => {
    const containerRef = React.createRef<any>();

    const handleRender = async () => {
        const data = [
            { item: '事例一', count: 40, percent: 0.4 },
            { item: '事例二', count: 21, percent: 0.21 },
            { item: '事例三', count: 17, percent: 0.17 },
            // {item: '事例四', count: 13, percent: 0.13},
            // {item: '事例五', count: 9, percent: 0.09},
        ];

        const chart = new Chart({
            container: containerRef.current,
            autoFit: true,
            height: 400,
        });

        chart.coordinate({ type: 'theta', outerRadius: 0.8 });

        chart
            .interval()
            .data(data)
            .transform({ type: 'stackY' })
            .encode('y', 'percent')
            .encode('color', 'item')
            .legend(false)
            .label({
                position: 'outside',
                text: (data: any) => `${data.item}: ${data.percent * 100}%`,
            })
            .tooltip((data) => ({
                name: data.item,
                value: `${data.percent * 100}%`,
            }));

        await chart.render();
    };

    useEffect(() => {
        handleRender().then();
    }, []);

    return (
        <Card title={`节点类型统计`}>
            <div ref={containerRef} />
        </Card>
    );
};
