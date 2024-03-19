import {useForm} from 'react-hook-form';
import './Form.css';

export interface FormInput {
    Id: number;
    Departure: string;
    Destination: string;
    Date: string;
    Hour: string;
    Price: number;
}

interface FormProps {
    onAddTicket: (data: FormInput) => void;
}

export function Form({onAddTicket}: FormProps) {
    const {register, handleSubmit} = useForm<FormInput>();

    const onSubmit = (data: FormInput) => {
        onAddTicket(data);
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
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
                    <input type='number' step='0.01' {...register('Price')} />
                </div>

                <input type='submit' value='Submit' className='submit-button' />
            </form>
        </div>
    );
}
