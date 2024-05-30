import axios from 'axios';
import {useEffect, useState} from 'react';
import {TicketCard} from '../../components/Card/Card';
import {PlaneTicket} from '../../data/planeTicket';
import './BookFlight.css';

const BookFlight = () => {
    const [tickets, setTickets] = useState<PlaneTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchTickets = async (page: number) => {
        try {
            const response = await axios.get('http://localhost:8080/display', {
                params: {
                    sortDirection: 'Most Recent Added',
                    pageNumber: currentPage,
                },
            });

            const newTickets = response.data.map((ticket: any) => {
                return new PlaneTicket(
                    ticket.planeId,
                    ticket.departure,
                    ticket.destination,
                    ticket.data,
                    ticket.hour,
                    ticket.price,
                );
            });

            if (newTickets.length === 0) {
                setHasMore(false);
            } else {
                setTickets((prevTickets) => [...prevTickets, ...newTickets]);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets(currentPage);
    }, [currentPage]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (hasMore && !loading) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    return (
        <div className='add-user-page'>
            <h1 className='unique-font'>Book your ticket now</h1>
            <div className='ticket-grid'>
                {tickets.map((ticket, index) => (
                    <TicketCard key={index} ticket={ticket} />
                ))}
            </div>
            {loading && (
                <div className='spinner-container'>
                    <div className='spinner'></div>
                </div>
            )}
        </div>
    );
};

export default BookFlight;
