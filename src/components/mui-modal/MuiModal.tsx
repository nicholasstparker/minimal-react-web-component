import {useState} from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import {
    QueryClient,
    QueryClientProvider,
    useQuery
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

type User = {
    id: number;
    name: string;
    phone: string;
}

function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, open} = props;

    const {data, isPending, isError} = useQuery({
        queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        },
        queryKey: ["users"],
    })

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>fetch users test</DialogTitle>
                <List sx={{pt: 0}}>
                        {data && !isPending && !isError && (
                            data.map((user: User) => (
                                <ListItem key={user.id}>
                                    {user.name} {user.phone}
                                </ListItem>
                            ))
                        )}
                </List>
        </Dialog>
    );
}

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