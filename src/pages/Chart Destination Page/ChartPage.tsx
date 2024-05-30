import React from 'react';
import PieChart from '../../components/Chart/Chart';
import {useTicketContext} from '../../context/TicketContext';
import './ChartPage.css';

const ChartPage: React.FC = () => {
    const {tickets} = useTicketContext();

    const calculateTicketCountByDestination = () => {
        const ticketCountByDestination: {[key: string]: number} = {};

        tickets.forEach((ticket) => {
            const destination = ticket.getDestination();
            if (ticketCountByDestination[destination]) {
                ticketCountByDestination[destination]++;
            } else {
                ticketCountByDestination[destination] = 1;
            }
        });

        return ticketCountByDestination;
    };

    const generateChartData = () => {
        const ticketCountByDestination = calculateTicketCountByDestination();
        const chartData = Object.entries(ticketCountByDestination).map(
            ([destination, count]) => ({
                destination,
                count,
            }),
        );
        return chartData;
    };

    return (
        <div className='chart-page'>
            <h1>Destinations Chart</h1>
            {}
            <PieChart chartData={generateChartData()} />
            {}
            <div className='chart-legend'>
                {generateChartData().map((entry, index) => (
                    <div key={index} className='legend-entry'>
                        <span className='legend-color'></span>
                        <span className='legend-label'>
                            {entry.destination}: {entry.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartPage;
