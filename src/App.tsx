import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {TicketProvider} from './context/TicketContext';
import {UserProvider} from './context/UserContext';
import {PlaneTicket} from './data/planeTicket';
import {User} from './data/user';
import {AddTicketPage} from './pages/Add Ticket Page/AddTicketPage';
import {AddUserPage} from './pages/Add User Page/AddUserPage';
import BookFlight from './pages/Book Flight/BookFlight';
import ChartPage from './pages/Chart Destination Page/ChartPage';
import {DisplayTicketsPage} from './pages/Display Tickets Page/DisplayTicketPage';
import DisplayUsers from './pages/DisplayUsersPage/DisplayUsersPage';
import {EditTicketPage} from './pages/EditTicketPage/EditTicketPage';
import {EditUserPage} from './pages/EditUserPage/EditUserPage';
import Home from './pages/Home page/HomePage';

function App() {
    const [tickets, setTickets] = useState<PlaneTicket[]>([]);
    const handleAddTicket = (ticket: PlaneTicket) => {
        setTickets([...tickets, ticket]);
    };
    const [users, setUsers] = useState<User[]>([]);
    const handleCreateUser = (user: User) => {
        setUsers([...users, user]);
    };
    return (
        <TicketProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/users' element={<DisplayUsers />} />
                        <Route
                            path='/addUser'
                            element={
                                <AddUserPage onCreateUser={handleCreateUser} />
                            }
                        />
                        <Route
                            path='/editUser/:userId'
                            element={<EditUserPage />}
                        />
                        <Route path='/home/:userId' element={<Home />} />
                        <Route
                            path='/display/:userId'
                            element={<DisplayTicketsPage />}
                        />
                        <Route
                            path='/add'
                            element={
                                <AddTicketPage onAddTicket={handleAddTicket} />
                            }
                        />
                        <Route
                            path='/edit/:ticketId'
                            element={<EditTicketPage />}
                        />
                        <Route path='/chart' element={<ChartPage />} />
                        <Route
                            path='/bookFlight/:userId'
                            element={<BookFlight />}
                        />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </TicketProvider>
    );
}

export default App;
