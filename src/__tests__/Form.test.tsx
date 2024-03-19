// import {fireEvent, render, waitFor} from '@testing-library/react';
// import {Form, FormInput} from './Form';

// describe('Form component', () => {
//     const mockAddTicket = jest.fn();

//     const renderForm = () => {
//         return render(<Form onAddTicket={mockAddTicket} />);
//     };

//     test('renders form fields', () => {
//         const {getByLabelText} = renderForm();

//         expect(getByLabelText('Id')).toBeInTheDocument();
//         expect(getByLabelText('Departure')).toBeInTheDocument();
//         expect(getByLabelText('Destination')).toBeInTheDocument();
//         expect(getByLabelText('Date')).toBeInTheDocument();
//         expect(getByLabelText('Hour')).toBeInTheDocument();
//         expect(getByLabelText('Price')).toBeInTheDocument();
//     });

//     test('calls onAddTicket with form data on submit', async () => {
//         const {getByLabelText, getByText} = renderForm();

//         const testData: FormInput = {
//             Id: 1,
//             Departure: 'New York',
//             Destination: 'London',
//             Date: '2024-03-19',
//             Hour: '12:00',
//             Price: 500,
//         };

//         fireEvent.change(getByLabelText('Id'), {target: {value: testData.Id}});
//         fireEvent.change(getByLabelText('Departure'), {
//             target: {value: testData.Departure},
//         });
//         fireEvent.change(getByLabelText('Destination'), {
//             target: {value: testData.Destination},
//         });
//         fireEvent.change(getByLabelText('Date'), {
//             target: {value: testData.Date},
//         });
//         fireEvent.change(getByLabelText('Hour'), {
//             target: {value: testData.Hour},
//         });
//         fireEvent.change(getByLabelText('Price'), {
//             target: {value: testData.Price},
//         });

//         fireEvent.click(getByText('Submit'));

//         await waitFor(() => {
//             expect(mockAddTicket).toHaveBeenCalledWith(testData);
//         });
//     });
// });
// function expect(arg0: any) {
//     throw new Error('Function not implemented.');
// }
