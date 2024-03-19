import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormProps, useNavigate, useParams} from 'react-router-dom';
import {FormInput} from '../../components/Form/Form';
import {useTicketContext} from '../../context/TicketContext';
import {PlaneTicket} from '../../data/planeTicket';

interface ExtendedFormProps extends FormProps {
    onUpdateTicket: (data: FormInput) => void;
    formData: FormInput;
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

    const Form = ({onUpdateTicket, formData, ...rest}: ExtendedFormProps) => {
        const {register, handleSubmit} = useForm<FormInput>();
        const onSubmit = (data: FormInput) => {
            onUpdateTicket(data);
        };

        return (
            <div className='form-container'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='form'
                    {...rest}
                >
                    <div className='form-group'>
                        <label>Id</label>
                        <input type='number' step='1' {...register('Id')} />
                    </div>
                    <div className='form-group'>
                        <label>Departure</label>
                        <input type='text' {...register('Departure')} />
                    </div>

                    <div className='form-group'>
                        <label>Destination</label>
                        <input type='text' {...register('Destination')} />
                    </div>

                    <div className='form-group'>
                        <label>Date</label>
                        <input type='date' {...register('Date')} />
                    </div>

                    <div className='form-group'>
                        <label>Hour</label>
                        <input type='time' {...register('Hour')} />
                    </div>

                    <div className='form-group'>
                        <label>Price</label>
                        <input
                            type='number'
                            step='0.01'
                            {...register('Price')}
                        />
                    </div>

                    <input
                        type='submit'
                        value='Submit'
                        className='submit-button'
                    />
                </form>
            </div>
        );
    };

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

    const handleUpdateTicket = (data: FormInput) => {
        const updatedTickets = tickets.map((ticket) => {
            if (ticket.getId() === data.Id) {
                const updatedTicket = new PlaneTicket(
                    data.Id,
                    data.Departure,
                    data.Destination,
                    data.Date,
                    data.Hour,
                    data.Price,
                );
                return updatedTicket;
            }
            return ticket;
        });
        setTickets(updatedTickets);
        console.log(updatedTickets);
        navigate('/display');
    };

    return (
        <div>
            <h1>Edit Ticket</h1>
            <Form onUpdateTicket={handleUpdateTicket} formData={formData} />
        </div>
    );
}
