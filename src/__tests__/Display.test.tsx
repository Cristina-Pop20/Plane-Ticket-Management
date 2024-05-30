// import {fireEvent, render} from '@testing-library/react';
// import {DisplayTicketsPage} from '../pages/Display Tickets Page/DisplayTicketPage';

// jest.mock('../../context/TicketContext', () => ({
//     useTicketContext: () => ({
//         tickets: [
//             {id: 1, departure: 'New York', price: 200},
//             {id: 2, departure: 'Los Angeles', price: 250},
//         ],
//         setTickets: jest.fn(),
//     }),
// }));

// test('renders DisplayTicketsPage component', () => {
//     const {getByText, getByLabelText} = render(<DisplayTicketsPage />);
//     expect(getByText('Where do you fly today?')).toBeInTheDocument();
//     const sortDropdown = getByLabelText('Sort By');
//     expect(sortDropdown).toBeInTheDocument();
//     expect(getByText('New York')).toBeInTheDocument();
//     expect(getByText('Los Angeles')).toBeInTheDocument();
//     expect(getByText('Add ticket')).toBeInTheDocument();
//     expect(getByText('Edit')).toBeInTheDocument();
// });

// test('sorting tickets by "A-Z"', () => {
//     const {getByLabelText, getByText} = render(<DisplayTicketsPage />);
//     const sortDropdown = getByLabelText('Sort By');
//     fireEvent.change(sortDropdown, {target: {value: 'A-Z'}});
//     expect(getByText('Los Angeles')).toBeInTheDocument();
//     expect(getByText('New York')).toBeInTheDocument();
// });
