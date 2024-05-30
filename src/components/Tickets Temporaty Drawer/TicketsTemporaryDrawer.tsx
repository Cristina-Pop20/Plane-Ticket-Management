import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Equalizer as EqualizerIcon,
    NoteAdd as NoteAddIcon,
} from '@mui/icons-material';
import SegmentIcon from '@mui/icons-material/Segment';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {useState} from 'react';

interface TicketsTemporaryDrawerProps {
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onChart: () => void;
}

const TicketsTemporaryDrawer: React.FC<TicketsTemporaryDrawerProps> = ({
    onAdd,
    onEdit,
    onDelete,
    onChart,
}) => {
    const toggleDrawer =
        (open: boolean | ((prevState: boolean) => boolean)) => () => {
            setOpen(open);
        };

    const [open, setOpen] = useState(false);

    return (
        <div>
            <IconButton className='menu-button' onClick={toggleDrawer(true)}>
                <SegmentIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button onClick={onAdd}>
                        <ListItemIcon>
                            <NoteAddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Add Ticket' />
                    </ListItem>
                    <ListItem button onClick={onEdit}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary='Edit Ticket' />
                    </ListItem>
                    <ListItem button onClick={onDelete}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary='Delete Ticket' />
                    </ListItem>
                    <ListItem button onClick={onChart}>
                        <ListItemIcon>
                            <EqualizerIcon />
                        </ListItemIcon>
                        <ListItemText primary='Chart' />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default TicketsTemporaryDrawer;
