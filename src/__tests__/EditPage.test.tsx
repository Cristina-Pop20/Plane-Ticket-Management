// import {fireEvent, render, screen, waitFor} from '@testing-library/react';
// import {MemoryRouter, Route} from 'react-router-dom';
// import {EditTicketPage} from '../pages/EditTicketPage/EditTicketPage';

// describe('EditTicketPage', () => {
//     test('renders edit ticket form with correct initial values', async () => {
//         render(
//             <MemoryRouter initialEntries={['/edit/1']}>
//                 <Route path='/edit/:ticketId'>
//                     <EditTicketPage />
//                 </Route>
//             </MemoryRouter>,
//         );

//         await waitFor(() => {
//             expect(screen.getByLabelText('Id')).toHaveValue(1);
//             expect(screen.getByLabelText('Departure')).toHaveValue(
//                 'Cluj-Napoca',
//             );
//             expect(screen.getByLabelText('Destination')).toHaveValue('Paris');
//             expect(screen.getByLabelText('Date')).toHaveValue('2024-03-17');
//             expect(screen.getByLabelText('Hour')).toHaveValue('12:00');
//             expect(screen.getByLabelText('Price')).toHaveValue(90);
//         });
//     });

//     test('updates ticket data and navigates to display page on form submission', async () => {
//         render(
//             <MemoryRouter initialEntries={['/edit/1']}>
//                 <Route path='/edit/:ticketId'>
//                     <EditTicketPage />
//                 </Route>
//             </MemoryRouter>,
//         );

//         fireEvent.change(screen.getByLabelText('Departure'), {
//             target: {value: 'New Departure'},
//         });
//         fireEvent.change(screen.getByLabelText('Destination'), {
//             target: {value: 'New Destination'},
//         });

//         fireEvent.submit(screen.getByTestId('edit-ticket-form'));

//         expect(navigator).toHaveBeenCalledWith('/display');
//     });
// });
