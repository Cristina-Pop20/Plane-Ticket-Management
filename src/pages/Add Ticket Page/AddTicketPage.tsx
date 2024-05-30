import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, FormInput} from '../../components/Form/Form';
import {useTicketContext} from '../../context/TicketContext';
import {PlaneTicket} from '../../data/planeTicket';
import {User} from '../../data/user';
import './AddTicketPage.css';

interface AddTicketPageProps {
    onAddTicket: (ticket: PlaneTicket) => void;
}
export function AddTicketPage({onAddTicket}: AddTicketPageProps) {
    const navigate = useNavigate();
    const {addTicket} = useTicketContext();

    const handleAddTicket = async (data: FormInput) => {
        try {
            const user = new User(
                1,
                'Pop',
                'Cristina',
                'pop.cristina@gmail.com',
                '1234',
            );
            const response = await axios.post<PlaneTicket>(
                'http://localhost:8080/addTicket',
                {
                    id: data.Id,
                    departure: data.Departure,
                    destination: data.Destination,
                    date: data.Date,
                    hour: data.Hour,
                    price: data.Price,
                    user,
                },
            );
            console.log('Ticket added successfully:', response.data);
            addTicket(response.data);
            navigate('/display');
        } catch (error) {
            console.error('Error adding ticket:', error);
        }
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
    return (
        <div className='add-ticket-page'>
            <h1>Add new ticket</h1>
            <Form onAddTicket={handleAddTicket} />
        </div>
    );
}
