import React, {ReactNode, createContext, useContext, useState} from 'react';
import {PlaneTicket} from '../data/planeTicket';

interface TicketContextProps {
    tickets: PlaneTicket[];
    addTicket: (ticket: PlaneTicket) => void;
    setTickets: React.Dispatch<React.SetStateAction<PlaneTicket[]>>;
}

const TicketContext = createContext<TicketContextProps>({
    tickets: [],
    addTicket: () => {},
    setTickets: () => {},
});

export const useTicketContext = () => useContext(TicketContext);

export const TicketProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [tickets, setTickets] = useState<PlaneTicket[]>([]);

    const addTicket = (ticket: PlaneTicket) => {
        setTickets((prevTickets) => [...prevTickets, ticket]);
    };

    return (
        <TicketContext.Provider value={{tickets, addTicket, setTickets}}>
            {children}
        </TicketContext.Provider>
    );
};
