// AddTicketPage.tsx
import {useNavigate} from 'react-router-dom';
import {Form, FormInput} from '../../components/Form/Form';
import {useTicketContext} from '../../context/TicketContext';
import {PlaneTicket} from '../../data/planeTicket';
import './AddTicketPage.css';

interface AddTicketPageProps {
    onAddTicket: (ticket: PlaneTicket) => void;
}
export function AddTicketPage({onAddTicket}: AddTicketPageProps) {
    const navigate = useNavigate();
    const {addTicket} = useTicketContext();

    const handleAddTicket = (data: FormInput) => {
        const ticket = new PlaneTicket(
            data.Id,
            data.Departure,
            data.Destination,
            data.Date,
            data.Hour,
            data.Price,
        );
        onAddTicket(ticket);
        addTicket(ticket);
        navigate('/display');
    };

    return (
        <div className='add-ticket-page'>
            <h1>Add new ticket</h1>
            <Form onAddTicket={handleAddTicket} />
        </div>
    );
}
