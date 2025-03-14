import {useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import SimpleDialog from './SimpleDialog';

const queryClient = new QueryClient();

export default function MuiModal({buttonlabel = ""}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Box>
                <Button variant="outlined" onClick={handleClickOpen}>
                    {buttonlabel}
                </Button>
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                />
            </Box>
        </QueryClientProvider>
    );
}