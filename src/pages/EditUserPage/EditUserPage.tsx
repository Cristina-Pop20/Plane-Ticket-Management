import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {UserForm, UserFormInput} from '../../components/Form/UserFrom';
import {useUserContext} from '../../context/UserContext';
import {User} from '../../data/user';
import './EditUserPage.css';

interface EditUserPageProps {
    onUpdateUser?: (user: User) => void;
}

export function EditUserPage({onUpdateUser}: EditUserPageProps) {
    const {id} = useParams();
    const navigate = useNavigate();
    const {users, setUsers} = useUserContext();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        document.title = 'Joy of travel';
        const favicon = document.querySelector(
            "link[rel*='icon']",
        ) as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/plane_fly.jpg';
        }
    }, []);

    useEffect(() => {
        if (id) {
            const fetchedUser = users.find(
                (u: User) => u.getUserId() === parseInt(id),
            );
            if (fetchedUser) {
                setUser(fetchedUser);
            } else {
                navigate('/users');
            }
        }
    }, [id, users, navigate]);

    const handleUpdateUser = async (data: UserFormInput) => {
        try {
            const response = await axios.put<User>(
                `http://localhost:8080/users/${data.userId}`,
                {
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                },
            );
            console.log('User updated successfully:', response.data);
            setUser(response.data);
            navigate('/users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='edit-user-page'>
            <h1 className='unique-font'>Edit User</h1>
            <UserForm onCreateUser={handleUpdateUser} />
        </div>
    );
}
