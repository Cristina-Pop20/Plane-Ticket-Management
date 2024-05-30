import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserForm, UserFormInput} from '../../components/Form/UserFrom';
import {useUserContext} from '../../context/UserContext';
import {User} from '../../data/user';
import './AddUserPage.css';

interface AddUserPageProps {
    onCreateUser: (user: User) => void;
}

export function AddUserPage({onCreateUser}: AddUserPageProps) {
    const navigate = useNavigate();
    const {addUser} = useUserContext();

    const handleAddUser = async (data: UserFormInput) => {
        try {
            const response = await axios.post<User>(
                'http://localhost:8080/addUser',
                {
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                },
            );
            console.log('User added successfully:', response.data);
            addUser(response.data);
            navigate('/users');
        } catch (error) {
            console.error('Error adding user:', error);
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
        <div className='add-user-page'>
            <h1 className='unique-font'>Complete your profile</h1>
            <UserForm onCreateUser={handleAddUser} />
        </div>
    );
}
