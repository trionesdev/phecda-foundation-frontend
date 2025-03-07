import { Card } from 'antd';
import React, {memo, useEffect} from 'react';
import { Chart } from '@antv/g2';

export const AlarmLevelStatistics = memo(() => {
    const containerRef = React.createRef<any>();

    const handleRender = async () => {
        const data = [
            { item: 'A级告警', count: 40, percent: 0.4 },
            { item: 'B级告警', count: 21, percent: 0.21 },
            { item: 'C级告警', count: 17, percent: 0.17 },
        ];

        const chart = new Chart({
            container: containerRef.current,
            autoFit: true,
            height: 250,
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
        <Card
            size={`small`}
            title={`告警类型`}
            styles={{ body: { height: 300 } }}
        >
            <div ref={containerRef} />
        </Card>
    );
})
