import {PlaneTicket} from '../../data/planeTicket';
import './Card.css';

interface CardProps {
    ticket: PlaneTicket;
    onClick?: () => void;
}

export function Card({ticket, onClick}: CardProps) {
    console.log(ticket);
    return (
        <div className='card' onClick={onClick}>
            <h2>Ticket Details</h2>
            <p>Departure: {ticket?.getDeparture()}</p>
            <p>Destination: {ticket?.getDestination()}</p>
            <p>Date: {ticket.getDate()}</p>
            <p>Hour: {ticket.getHour()}</p>
            <p>Price: {ticket.getPrice()}</p>
        </div>
    );
}
