// // import '@testing-library/jest-dom';
// // import {fireEvent, render, screen} from '@testing-library/react';
// // import {expect, test} from 'vitest';
// // import {Form, FormInput} from '../components/Form/Form';

// import {render} from '@testing-library/react';
// import {Form, FormInput} from '../components/Form/Form';

// // test('Form component renders all form fields', () => {
// //     const mockOnAddTicket = jest.fn();

// //     render(<Form onAddTicket={mockOnAddTicket} />);

// //     expect(screen.getByLabelText('Id')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Departure')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Destination')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Date')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Hour')).toBeInTheDocument();
// //     expect(screen.getByLabelText('Price')).toBeInTheDocument();
// // });

// // test('Form component calls onAddTicket with form data when submitted', () => {
// //     const mockOnAddTicket = jest.fn();

// //     render(<Form onAddTicket={mockOnAddTicket} />);

// //     const formData: FormInput = {
// //         Id: 1,
// //         Departure: 'Cluj-Napoca',
// //         Destination: 'Paris',
// //         Date: '2024-03-25',
// //         Hour: '12:00',
// //         Price: 100,
// //     };

// //     fireEvent.change(screen.getByLabelText('Id'), {
// //         target: {value: formData.Id.toString()},
// //     });
// //     fireEvent.change(screen.getByLabelText('Departure'), {
// //         target: {value: formData.Departure},
// //     });
// //     fireEvent.change(screen.getByLabelText('Destination'), {
// //         target: {value: formData.Destination},
// //     });
// //     fireEvent.change(screen.getByLabelText('Date'), {
// //         target: {value: formData.Date},
// //     });
// //     fireEvent.change(screen.getByLabelText('Hour'), {
// //         target: {value: formData.Hour},
// //     });
// //     fireEvent.change(screen.getByLabelText('Price'), {
// //         target: {value: formData.Price.toString()},
// //     });

// //     fireEvent.submit(screen.getByRole('form'));

// //     expect(mockOnAddTicket).toHaveBeenCalledWith(formData);
// // });
// describe('Form', () => {
//     it('should render the form', () => {
//         const result = render(
//             <Form
//                 onAddTicket={function (data: FormInput): void {
//                     throw new Error('Function not implemented.');
//                 }}
//             />,
//         );
//         expect(result).toMatchSnapshot;
//     });
// });
