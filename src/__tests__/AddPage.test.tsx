// import {fireEvent, render, screen} from '@testing-library/react';
// import {MemoryRouter, Route} from 'react-router-dom';
// import {AddTicketPage} from '../pages/Add Ticket Page/AddTicketPage';

// describe('AddTicketPage', () => {
//     test('adds a new ticket and navigates to display page on form submission', () => {
//         const onAddTicket = jest.fn();

//         render(
//             <MemoryRouter initialEntries={['/add']}>
//                 <Route path='/add'>
//                     <AddTicketPage onAddTicket={onAddTicket} />
//                 </Route>
//             </MemoryRouter>,
//         );

//         fireEvent.change(screen.getByLabelText('Departure'), {
//             target: {value: 'Cluj-Napoca'},
//         });
//         fireEvent.change(screen.getByLabelText('Destination'), {
//             target: {value: 'Paris'},
//         });
//         fireEvent.change(screen.getByLabelText('Date'), {
//             target: {value: '2024-03-17'},
//         });
//         fireEvent.change(screen.getByLabelText('Hour'), {
//             target: {value: '12:00'},
//         });
//         fireEvent.change(screen.getByLabelText('Price'), {
//             target: {value: '90'},
//         });

//         fireEvent.submit(screen.getByTestId('add-ticket-form'));

//         expect(onAddTicket).toHaveBeenCalledWith({
//             Id: 0,
//             Departure: 'Cluj-Napoca',
//             Destination: 'Paris',
//             Date: '2024-03-17',
//             Hour: '12:00',
//             Price: 90,
//         });

//         expect(navigator).toHaveBeenCalledWith('/display');
//     });
// });
