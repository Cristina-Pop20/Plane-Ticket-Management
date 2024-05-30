import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SegmentIcon from '@mui/icons-material/Segment';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../../context/UserContext';
import checkNetworkAndSyncData from '../../utils/syncUtils';
import LoginDialog from '../LoginDialog/LoginDialog';

interface TemporaryDrawerProps {
    selectedUserId: number | null;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({selectedUserId}) => {
    const [open, setOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const navigate = useNavigate();
    const {setUsers} = useUserContext();
    const [selectedUserName, setSelectedUserName] = useState('');
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    useEffect(() => {
        checkNetworkAndSyncData();
        window.addEventListener('online', checkNetworkAndSyncData);
        return () => {
            window.removeEventListener('online', checkNetworkAndSyncData);
        };
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            axios
                .get(`http://localhost:8080/users/${selectedUserId}`)
                .then((response) => {
                    const {firstName, lastName} = response.data;
                    setSelectedUserName(`${firstName} ${lastName}`);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [selectedUserId]);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleCreateUser = () => {
        setOpen(false);
        navigate('/addUser');
    };
    const handleEditAccount = (userId: number | null) => {
        if (userId) {
            navigate(`/editUser/${userId}`);
        } else {
            window.alert('Select account to edit');
        }
    };

    const handleDeleteAccount = (userId: number | null) => {
        if (userId) {
            setDeleteConfirmationOpen(true);
        } else {
            window.alert('Select account to delete');
        }
    };

    const handleConfirmDelete = () => {
        setPasswordDialogOpen(true);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        axios
            .get(`http://localhost:8080/users/${selectedUserId}`)
            .then((response) => {
                const userPassword = response.data.password;
                if (userPassword === password) {
                    axios
                        .delete(`http://localhost:8080/users/${selectedUserId}`)
                        .then(() => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error('Error deleting user:', error);
                        });
                } else {
                    window.alert('Cannot delete!\nWrong Password!');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error);
            });
        setPassword('');
        setPasswordDialogOpen(false);
        setDeleteConfirmationOpen(false);
    };

    const handleLogin = () => {
        setLoginDialogOpen(true);
    };

    return (
        <div>
            <IconButton className='menu-button' onClick={toggleDrawer(true)}>
                <SegmentIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{width: 250}}
                    role='presentation'
                    onClick={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button onClick={handleCreateUser}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary='Create Account' />
                        </ListItem>
                        <ListItem button onClick={handleLogin}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleEditAccount(selectedUserId)}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary='Edit Profile' />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleDeleteAccount(selectedUserId)}
                        >
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary='Delete Account' />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selected Account to Delete: {selectedUserName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmationOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={passwordDialogOpen}
                onClose={() => setPasswordDialogOpen(false)}
            >
                <DialogTitle>Enter Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Password'
                        type='password'
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {error && <Alert severity='error'>{error}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPasswordDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handlePasswordSubmit}>OK</Button>
                </DialogActions>
            </Dialog>
            <LoginDialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
            />
        </div>
    );
};

export default TemporaryDrawer;
