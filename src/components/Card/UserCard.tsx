import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {User} from '../../data/user';
import './UserCard.css';

interface UserCardProps {
    user: User;
    isSelected: boolean;
    onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({user, isSelected, onClick}) => {
    return (
        <Box sx={{minWidth: 275}}>
            <Card variant='outlined'>
                <CardContent
                    className={`user-card ${isSelected ? 'selected-user-card' : ''}`}
                    onClick={onClick}
                >
                    <Typography
                        sx={{fontSize: 14}}
                        color='text.secondary'
                        gutterBottom
                    >
                        User Information
                    </Typography>
                    <Typography variant='h5' component='div'>
                        {user.getFirstName()} {user.getLastName()}
                    </Typography>
                    <Typography sx={{mb: 1}} color='text.secondary'>
                        Email: {user.getEmail()}
                    </Typography>
                    {}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserCard;
