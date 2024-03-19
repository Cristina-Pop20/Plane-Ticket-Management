import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {TicketProvider} from './context/TicketContext';
import {PlaneTicket} from './data/planeTicket';
import {AddTicketPage} from './pages/Add Ticket Page/AddTicketPage';
import {DisplayTicketsPage} from './pages/Display Tickets Page/DisplayTicketPage';
import {EditTicketPage} from './pages/EditTicketPage/EditTicketPage';
import {Home} from './pages/Home page/HomePage';

// let ticket1: PlaneTicket = new PlaneTicket(
//     1,
//     'Cluj-Napoca',
//     'Paris',
//     '17.03.2024',
//     '12:00',
//     90,
// );
// let ticket2: PlaneTicket = new PlaneTicket(
//     2,
//     'Cluj-Napoca',
//     'Madrid',
//     '20.03.2024',
//     '13:00',
//     100,
// );

// const tickets = [ticket1, ticket2];
// const listTickets = tickets.map((ticket) => (
//     <li key={ticket.getId()}>
//         Departure:{ticket.getDeparture()}
//         Destination:{ticket.getDestination()}
//         Date:{ticket.getDate()}
//         Hour:{ticket.getHour()}
//         Price:{ticket.getPrice()}
//     </li>
// ));

function App() {
    const [tickets, setTickets] = useState<PlaneTicket[]>([
        new PlaneTicket(1, 'Cluj-Napoca', 'Paris', '17.03.2024', '12:00', 90),
        new PlaneTicket(2, 'Cluj-Napoca', 'Madrid', '20.03.2024', '13:00', 100),
    ]);
    const handleAddTicket = (ticket: PlaneTicket) => {
        setTickets([...tickets, ticket]);
    };
    return (
        <TicketProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/display' element={<DisplayTicketsPage />} />
                    <Route
                        path='/add'
                        element={
                            <AddTicketPage onAddTicket={handleAddTicket} />
                        }
                    />
                    <Route path='/edit/:id' element={<EditTicketPage />} />
                </Routes>
            </BrowserRouter>
        </TicketProvider>
    );
}

export default App;
