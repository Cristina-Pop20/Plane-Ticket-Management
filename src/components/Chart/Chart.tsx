import React from 'react';
import {
    Cell,
    PieChart as MuiPieChart,
    Pie,
    ResponsiveContainer,
} from 'recharts';
interface PieChartProps {
    chartData: {destination: string; count: number}[];
}

const PieChart: React.FC<PieChartProps> = ({chartData}) => {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <MuiPieChart>
                <Pie
                    data={chartData}
                    dataKey='count'
                    nameKey='destination'
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                        />
                    ))}
                </Pie>
            </MuiPieChart>
        </ResponsiveContainer>
    );
};

export default PieChart;
