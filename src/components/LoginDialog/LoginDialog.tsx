import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({open, onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .get(
                `http://localhost:8080/register?email=${email}&password=${password}`,
            )
            .then((response) => {
                const user = response.data;
                if (user) {
                    navigate(`/home/${user.userId}`);
                    onClose();
                } else {
                    setError('Invalid email or password!');
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                setError('Error logging in');
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    label='Email'
                    type='email'
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin='dense'
                    label='Password'
                    type='password'
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div>{error}</div>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
