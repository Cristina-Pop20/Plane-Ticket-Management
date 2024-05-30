// import {fireEvent, render, screen} from '@testing-library/react';
// import {MemoryRouter} from 'react-router-dom';
// import {Home} from '../pages/Home page/HomePage';

// describe('Home', () => {
//     test('renders images with correct titles', () => {
//         render(
//             <MemoryRouter>
//                 <Home />
//             </MemoryRouter>,
//         );

//         const imageTitles = screen.getAllByRole('heading', {level: 2});
//         expect(imageTitles).toHaveLength(1);
//         expect(imageTitles[0]).toHaveTextContent('View available flights');
//     });

//     test('navigates to display page when image is clicked', () => {
//         const {getByText} = render(
//             <MemoryRouter>
//                 <Home />
//             </MemoryRouter>,
//         );

//         const image = getByText('View available flights');
//         fireEvent.click(image);

//         expect(window.location.pathname).toBe('/display');
//     });
// });
