// import {fireEvent, render, screen} from '@testing-library/react';
// import {TicketCard} from '../components/Card/Card';
// import {PlaneTicket} from '../data/planeTicket';

// const mockTicket: PlaneTicket = {
//     id: 0,
//     departure: 'Cluj-Napoca',
//     destination: 'Paris',
//     date: '17.03.2024',
//     hour: '12:00',
//     price: 90,
//     getDeparture: jest.fn().mockReturnValue('Cluj-Napoca'),
//     getDestination: jest.fn().mockReturnValue('Paris'),
//     getDate: jest.fn().mockReturnValue('17.03.2024'),
//     getHour: jest.fn().mockReturnValue('12:00'),
//     getPrice: jest.fn().mockReturnValue(90),
//     getId: function (): number {
//         throw new Error('Function not implemented.');
//     },
//     setId: function (id: number): void {
//         throw new Error('Function not implemented.');
//     },
//     setDeparture: function (departure: string): void {
//         throw new Error('Function not implemented.');
//     },
//     setDestination: function (destination: string): void {
//         throw new Error('Function not implemented.');
//     },
//     setDate: function (date: string): void {
//         throw new Error('Function not implemented.');
//     },
//     setHour: function (hour: string): void {
//         throw new Error('Function not implemented.');
//     },
//     setPrice: function (price: number): void {
//         throw new Error('Function not implemented.');
//     },
// };

// describe('TicketCard', () => {
//     test('renders ticket card with basic information', () => {
//         render(<TicketCard ticket={mockTicket} />);

//         expect(screen.getByText('From: Cluj-Napoca')).toBeInTheDocument();
//         expect(screen.getByText('To: Paris')).toBeInTheDocument();
//     });

//     test('expands ticket card when expand button is clicked', () => {
//         render(<TicketCard ticket={mockTicket} />);

//         fireEvent.click(screen.getByLabelText('expand more'));

//         expect(screen.getByText('Date: 17.03.2024')).toBeInTheDocument();
//         expect(screen.getByText('Hour: 12:00')).toBeInTheDocument();
//         expect(screen.getByText('Price: 90')).toBeInTheDocument();
//     });

//     test('collapses ticket card when expand button is clicked twice', () => {
//         render(<TicketCard ticket={mockTicket} />);

//         fireEvent.click(screen.getByLabelText('expand more')); // Expand
//         fireEvent.click(screen.getByLabelText('expand more')); // Collapse

//         expect(screen.queryByText('Date: 17.03.2024')).toBeNull();
//         expect(screen.queryByText('Hour: 12:00')).toBeNull();
//         expect(screen.queryByText('Price: 90')).toBeNull();
//     });
// });
