import axios from 'axios';
import React, {useEffect, useState} from 'react';
import UserCard from '../../components/Card/UserCard';
import TemporaryDrawer from '../../components/TemporaryDrawer/TemporaryDrawer';
import {useUserContext} from '../../context/UserContext';
import {User} from '../../data/user';
import './DisplayUsersPage.css';

const DisplayUsers: React.FC = () => {
    const {users, setUsers} = useUserContext();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchUsers = async (pageNumber: number) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8080/users/range?start=${pageNumber}&size=50`,
            );
            const fetchedUsers: User[] = response.data.map((userData: any) => {
                return new User(
                    userData.userId,
                    userData.firstName,
                    userData.lastName,
                    userData.email,
                    userData.password,
                );
            });
            setUsers((prevUsers: User[]) => [...prevUsers, ...fetchedUsers]);
            setPage(pageNumber + 1);
            setLoading(false);
            setHasMore(fetchedUsers.length > 0);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (!loading && hasMore) {
                fetchUsers(page);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, page]);

    useEffect(() => {
        fetchUsers(page);
    }, []);

    useEffect(() => {
        document.title = 'Joy of travel';
        const favicon = document.querySelector(
            "link[rel*='icon']",
        ) as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/plane_fly.jpg';
        }
    }, []);

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId);
    };

    return (
        <div className='display-page'>
            <div className='header'>
                <h1 className='unique-font'>Select your account</h1>
                <div className='menu-button-container'>
                    <TemporaryDrawer selectedUserId={selectedUserId} />
                </div>
            </div>
            <div className='user-grid'>
                {users.map((user: User) => (
                    <div
                        key={user.getUserId()}
                        className='user-card-container'
                        onClick={() => handleUserClick(user.getUserId())}
                    >
                        <UserCard
                            user={user}
                            isSelected={selectedUserId === user.getUserId()}
                            onClick={() => handleUserClick(user.getUserId())}
                        />
                    </div>
                ))}
            </div>
            {}
            {loading && (
                <div className='spinner-container'>
                    <div className='spinner'></div>
                </div>
            )}
            {}
            {!loading && !hasMore && <div>No more users to load.</div>}
        </div>
    );
};

export default DisplayUsers;
