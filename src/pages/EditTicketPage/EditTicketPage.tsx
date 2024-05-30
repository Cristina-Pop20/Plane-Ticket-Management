import axios from 'axios';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {useTicketContext} from '../../context/TicketContext';
import {PlaneTicket} from '../../data/planeTicket';
import {User} from '../../data/user';
import './EditTicketPage.css';

interface FormInput {
    Id: number;
    Departure: string;
    Destination: string;
    Date: string;
    Hour: string;
    Price: number;
}

export function EditTicketPage() {
    const navigate = useNavigate();
    const {ticketId} = useParams<{ticketId: string}>();
    const {tickets, setTickets} = useTicketContext();
    const [formData, setFormData] = useState<FormInput>({
        Id: 0,
        Departure: '',
        Destination: '',
        Date: '',
        Hour: '',
        Price: 0,
    });

    useEffect(() => {
        if (ticketId && tickets.length > 0) {
            const ticket = tickets.find(
                (ticket) => ticket.getId() === parseInt(ticketId),
            );
            if (ticket) {
                setFormData({
                    Id: ticket.getId(),
                    Departure: ticket.getDeparture(),
                    Destination: ticket.getDestination(),
                    Date: ticket.getDate(),
                    Hour: ticket.getHour(),
                    Price: ticket.getPrice(),
                });
            }
        }
    }, [ticketId, tickets]);

    const handleUpdateTicket = async (data: FormInput) => {
        try {
            const user = new User(
                1,
                'Pop',
                'Cristina',
                'pop.cristina@gmail.com',
                '1234',
            );
            const response = await axios.put(
                `http://localhost:8080/updateTicket/${data.Id}`,
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
            console.log(response);
            if (response.status === 200) {
                const updatedTickets = tickets.map((ticket) => {
                    if (ticket.getId() === data.Id) {
                        return new PlaneTicket(
                            data.Id,
                            data.Departure,
                            data.Destination,
                            data.Date,
                            data.Hour,
                            data.Price,
                        );
                    }
                    return ticket;
                });
                setTickets(updatedTickets);
                navigate('/display');
            } else {
                console.error('Failed to update ticket');
            }
        } catch (error) {
            console.error('Error occurred while updating ticket:', error);
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
        <div className='edit-ticket-page'>
            <h1>Edit Ticket</h1>
            <Form onUpdateTicket={handleUpdateTicket} formData={formData} />
        </div>
    );
}

interface FormProps {
    onUpdateTicket: (data: FormInput) => void;
    formData: FormInput;
}

function Form({onUpdateTicket, formData}: FormProps) {
    const {register, handleSubmit} = useForm<FormInput>();
    const onSubmit = (data: FormInput) => {
        onUpdateTicket(data);
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-group'>
                    <label>Id</label>
                    <input
                        type='number'
                        step='1'
                        defaultValue={formData.Id}
                        {...register('Id')}
                    />
                </div>
                <div className='form-group'>
                    <label>Departure</label>
                    <input
                        type='text'
                        defaultValue={formData.Departure}
                        {...register('Departure')}
                    />
                </div>
                <div className='form-group'>
                    <label>Destination</label>
                    <input
                        type='text'
                        defaultValue={formData.Destination}
                        {...register('Destination')}
                    />
                </div>
                <div className='form-group'>
                    <label>Date</label>
                    <input
                        type='date'
                        defaultValue={formData.Date}
                        {...register('Date')}
                    />
                </div>
                <div className='form-group'>
                    <label>Hour</label>
                    <input
                        type='time'
                        defaultValue={formData.Hour}
                        {...register('Hour')}
                    />
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input
                        type='number'
                        step='0.01'
                        defaultValue={formData.Price}
                        {...register('Price')}
                    />
                </div>
                <input type='submit' value='Submit' className='submit-button' />
            </form>
        </div>
    );
}
