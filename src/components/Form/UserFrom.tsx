import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import './UserFrom.css';

export interface UserFormInput {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface UserFormProps {
    onCreateUser: (data: UserFormInput) => void;
}

export const UserForm: React.FC<UserFormProps> = ({onCreateUser}) => {
    const {register, handleSubmit} = useForm<UserFormInput>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<UserFormInput> = (data) => {
        console.log(data);
        onCreateUser(data);
        navigate('/users');
        window.location.reload();
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-group'>
                    <label>User ID</label>
                    <input type='number' step='1' {...register('userId')} />
                </div>
                <div className='form-group'>
                    <label>First Name</label>
                    <input type='text' {...register('firstName')} />
                </div>

                <div className='form-group'>
                    <label>Last Name</label>
                    <input type='text' {...register('lastName')} />
                </div>

                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' {...register('email')} />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' {...register('password')} />
                </div>

                <input type='submit' value='Finish' className='submit-button' />
            </form>
        </div>
    );
};
