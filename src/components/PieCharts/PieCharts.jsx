import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Attendances', value: 65 },
    { name: 'Absences', value: 10 },
];

const COLORS = ['#fb9678', '#EDEDED'];

const PieCharts = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius="60%"
                        outerRadius="90%"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    95%
                </span>
                <div>
                    <p
                        className="text-center m-0"
                        style={{ fontSize: '14px', color: '#222' }}
                    >
                        Today
                    </p>
                    <p
                        className="text-center  m-0"
                        style={{ fontSize: '14px', color: '#222' }}
                    >
                        Attendances
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PieCharts;
