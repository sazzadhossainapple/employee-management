import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', expense: 20, percentage: null },
    { month: 'Feb', expense: 25, percentage: null },
    { month: 'Mar', expense: 30, percentage: null },
    { month: 'Apr', expense: 35, percentage: null },
    { month: 'May', expense: 40, percentage: null },
    { month: 'Jun', expense: 45, percentage: null },
    { month: 'Jul', expense: 50, percentage: null },
    { month: 'Aug', expense: 70, percentage: null },
    { month: 'Sep', expense: 55, percentage: null },
    { month: 'Oct', expense: 50, percentage: null },
    { month: 'Nov', expense: 60, percentage: null },
    { month: 'Dec', expense: 65, percentage: null },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    backgroundColor: 'black',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    color: 'white',
                }}
            >
                <div>{`Expenses: TK${payload[0].value}`}</div>
                {payload[0].payload.percentage !== null && (
                    <div>{`Percentage: ${payload[0].payload.percentage}%`}</div>
                )}
            </div>
        );
    }
    return null;
};

const BarChartTarget = () => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} barCategoryGap="25%">
                    <XAxis
                        dataKey="month"
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="expense"
                        radius={[10, 10, 0, 0]}
                        fill="#025864"
                        barSize={20}
                        background={{ fill: '#F8F9FA' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartTarget;
