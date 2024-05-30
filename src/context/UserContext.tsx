import React, {ReactNode, createContext, useContext, useState} from 'react';
import {User} from '../data/user';

interface UserContextProps {
    users: User[];
    addUser: (user: User) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<UserContextProps>({
    users: [],
    addUser: () => {},
    setUsers: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [users, setUsers] = useState<User[]>([]);

    const addUser = (user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <UserContext.Provider value={{users, addUser, setUsers}}>
            {children}
        </UserContext.Provider>
    );
};
