import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card} from '../../components/Card/Card';
import {useTicketContext} from '../../context/TicketContext';
import './DisplayTicketPage.css';

export function DisplayTicketsPage() {
    const navigate = useNavigate();
    const {tickets: contextTickets, setTickets} = useTicketContext();
    const [draggedTicketId, setDraggedTicketId] = useState<number | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(
        null,
    );

    const handleClick = () => {
        navigate('/add');
    };

    const handleEdit = () => {
        if (selectedTicketId === null) {
            alert('Please select a ticket to edit.');
        } else {
            navigate(`/edit/${selectedTicketId}`);
        }
    };

    const handleDragStart = (ticketId: number) => {
        setDraggedTicketId(ticketId);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = () => {
        if (draggedTicketId !== null) {
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this ticket?',
            );

            if (confirmDelete) {
                setTickets((prevTickets) =>
                    prevTickets.filter(
                        (ticket) => ticket.getId() !== draggedTicketId,
                    ),
                );
            }
            setDraggedTicketId(null);
        }
    };

    const handleSelectTicket = (ticketId: number) => {
        setSelectedTicketId(ticketId);
    };

    return (
        <div className='display-page'>
            <h1>Tickets available</h1>
            <div className='ticket-list'>
                {contextTickets.map((ticket, index) => (
                    <div
                        key={index}
                        className='ticket-card'
                        draggable
                        onDragStart={() => handleDragStart(ticket.getId())}
                    >
                        <Card
                            ticket={ticket}
                            onClick={() => handleSelectTicket(ticket.getId())}
                        />
                    </div>
                ))}
            </div>
            <button className='add-button' onClick={handleClick}>
                Add ticket
            </button>
            <button className='edit-button' onClick={handleEdit}>
                Edit
            </button>
            <div
                className='bin'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                Drop ticket here to delete
            </div>
        </div>
    );
}
