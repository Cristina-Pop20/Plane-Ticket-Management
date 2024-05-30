import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useState} from 'react';
import {PlaneTicket} from '../../data/planeTicket';

interface CardProps {
    ticket: PlaneTicket;
}

const CustomCard = styled(Card)({
    maxWidth: 345,
    backgroundColor: 'rgb(76, 155, 215)',
    color: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    '&:hover': {
        border: '2px solid rgba(110, 38, 254, 0.633)',
        boxSizing: 'border-box',
    },
    '&.selected': {
        border: '2px solid rgba(110, 38, 254, 0.633)',
    },
});

const CustomCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
        color: 'white',
    },
});

export function TicketCard({ticket}: CardProps) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <CustomCard>
            <CustomCardContent>
                <div>
                    <Typography variant='body2' color='text.secondary'>
                        From: {ticket.getDeparture()}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        To: {ticket.getDestination()}
                    </Typography>
                </div>
                {expanded && (
                    <div>
                        <Typography variant='body2' color='text.secondary'>
                            Date: {ticket.getDate()}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Hour: {ticket.getHour()}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Price: {ticket.getPrice()}
                        </Typography>
                    </div>
                )}
            </CustomCardContent>
            <IconButton aria-label='expand more' onClick={handleExpandClick}>
                <ExpandMoreIcon />
            </IconButton>
        </CustomCard>
    );
}
