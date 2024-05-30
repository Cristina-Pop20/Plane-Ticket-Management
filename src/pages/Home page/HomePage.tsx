import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './HomePage.css';

const images = [
    {
        url: '/assets/button1.jpg',
        title: 'View available flights',
        width: 300,
    },
    {
        url: '/assets/plane.jpg',
        title: 'Book Flight',
        width: 300,
    },
];

const ImageButton = styled(ButtonBase)(({}) => ({
    position: 'relative',
    height: 200,
    width: '200%',
    flex: 1,
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const Home = () => {
    const navigate = useNavigate();
    const {userId} = useParams<{userId: string}>();
    const handleClick = (title: string, userId: any) => {
        if (title === 'View available flights') {
            navigate(`/display/${userId}`);
        } else if (title === 'Book Flight') {
            navigate(`/bookFlight/${userId}`);
        }
    };
    useEffect(() => {
        document.title = 'Joy of travel';
        const favicon = document.querySelector(
            "link[rel*='icon']",
        ) as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/plane_fly.jpg';
        }
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 300,
                width: '100%',
            }}
        >
            <Typography variant='h4' className='unique-font' gutterBottom>
                Choose your next destination
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    minWidth: 300,
                    width: '100%',
                }}
            >
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={() => handleClick(image.title, userId)}
                    >
                        <ImageSrc
                            style={{backgroundImage: `url(${image.url})`}}
                        />
                        <ImageBackdrop className='MuiImageBackdrop-root' />
                        <Image>
                            <Typography
                                component='span'
                                variant='subtitle1'
                                color='inherit'
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) =>
                                        `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className='MuiImageMarked-root' />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>
        </Box>
    );
};
export default Home;
