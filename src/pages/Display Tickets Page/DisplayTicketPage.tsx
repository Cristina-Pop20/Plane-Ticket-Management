import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TicketCard} from '../../components/Card/Card';
import TicketsTemporaryDrawer from '../../components/Tickets Temporaty Drawer/TicketsTemporaryDrawer';
import {useTicketContext} from '../../context/TicketContext';
import {PlaneTicket} from '../../data/planeTicket';
import './DisplayTicketPage.css';

export function DisplayTicketsPage() {
    const navigate = useNavigate();
    const {tickets: contextTickets, setTickets} = useTicketContext();
    const [draggedTicketId, setDraggedTicketId] = useState<number | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(
        null,
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const ticketsPerPage = 9;
    const totalTickets = contextTickets.length;
    const totalPages = Math.ceil(totalTickets / ticketsPerPage);
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

    const handleClick = () => {
        navigate('/add');
    };

    const handleChart = () => {
        navigate('/chart');
    };

    const handleEdit = () => {
        if (selectedTicketId === null) {
            alert('Please select a ticket to edit.');
        } else {
            navigate(`/edit/${selectedTicketId}`);
        }
    };

    const handleDragStart = (ticketId: number) => {
        console.log('Id:', ticketId);
        setDraggedTicketId(ticketId);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = () => {
        if (draggedTicketId !== null) {
            console.log(draggedTicketId);
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this ticket?',
            );

            if (confirmDelete) {
                axios
                    .delete(
                        `http://localhost:8080/deleteTicket/${selectedTicketId}`,
                    )
                    .then(() => {
                        setTickets((prevTickets) =>
                            prevTickets.filter(
                                (ticket) => ticket.getId() !== selectedTicketId,
                            ),
                        );
                    })
                    .catch((error) => {
                        console.error('Error deleting ticket:', error);
                    });
            }
            setDraggedTicketId(null);
        }
    };

    const handleSelectTicket = (ticketId: number) => {
        setSelectedTicketId(ticketId);
        console.log(ticketId);
    };

    useEffect(() => {
        document.title = 'Joy of travel';
        const favicon = document.querySelector(
            "link[rel*='icon']",
        ) as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/plane_fly.jpg';
        }
    }, []);

    const fetchTickets = async () => {
        try {
            let sortDirection = 'Sort By';
            if (sortBy === 'Ascending Price') {
                sortDirection = 'ASC';
            } else if (sortBy === 'Descending Price') {
                sortDirection = 'DESC';
            } else if (sortBy === 'A-Z') {
                sortDirection = 'A-Z';
            } else if (sortBy === 'Most Recent Added') {
                sortDirection = 'Most Recent Added';
            } else if (sortBy === 'Sort By') {
                sortDirection = 'Sort By';
            } else {
                throw new Error('Invalid sort option');
            }
            console.log(sortDirection);
            console.log(currentPage);
            const response = await axios.get('http://localhost:8080/display', {
                params: {
                    sortDirection: sortDirection,
                    pageNumber: currentPage,
                },
            });

            const formattedTickets = response.data.map((ticket: any) => {
                return new PlaneTicket(
                    ticket.planeId,
                    ticket.departure,
                    ticket.destination,
                    ticket.data,
                    ticket.hour,
                    ticket.price,
                );
            });

            setTickets(formattedTickets);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTickets();
    }, [sortBy, currentPage, setTickets]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        fetchTickets();
    };

    const sortTickets = () => {
        let sortedTickets = [...contextTickets];

        if (sortBy === 'A-Z') {
            sortedTickets.sort((a, b) =>
                a.getDeparture().localeCompare(b.getDeparture()),
            );
        } else if (sortBy === 'Ascending Price') {
            sortedTickets.sort((a, b) => a.getPrice() - b.getPrice());
        } else if (sortBy === 'Descending Price') {
            sortedTickets.sort((a, b) => b.getPrice() - a.getPrice());
        } else if (sortBy === 'Most Recent Added') {
            sortedTickets.sort((a, b) => b.getId() - a.getId());
        }

        return sortedTickets;
    };

    const sortedTickets = sortTickets();
    const currentTickets = sortedTickets.slice(
        indexOfFirstTicket,
        indexOfLastTicket,
    );

    return (
        <div className='display-page'>
            <div className='header'>
                <div className='header-top'>
                    <h1 className='unique-font'>Where do you fly today?</h1>
                    <div className='menu-button-container'>
                        <TicketsTemporaryDrawer
                            onAdd={handleClick}
                            onEdit={handleEdit}
                            onDelete={handleDrop}
                            onChart={handleChart}
                        />
                    </div>
                </div>
                <div className='sort-container'>
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        style={{borderRadius: '0.5rem'}}
                    >
                        <option value=''>Sort By</option>
                        <option value='A-Z'>A-Z</option>
                        <option value='Ascending Price'>Ascending Price</option>
                        <option value='Descending Price'>
                            Descending Price
                        </option>
                        <option value='Most Recent Added'>
                            Most Recent Added
                        </option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className='spinner-container'>
                    <div className='spinner'></div>
                </div>
            ) : (
                <div className='ticket-list'>
                    {currentTickets.map((ticket, index) => (
                        <div
                            key={index}
                            className={`ticket-card ${selectedTicketId === ticket.getId() ? 'selected' : ''}`}
                            draggable
                            onDragStart={() => handleDragStart(ticket.getId())}
                            onClick={() => handleSelectTicket(ticket.getId())}
                        >
                            <TicketCard ticket={ticket} />
                        </div>
                    ))}
                </div>
            )}
            <Stack spacing={2} direction='row'>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                />
            </Stack>
        </div>
    );
}
