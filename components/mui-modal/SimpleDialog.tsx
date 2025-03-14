import {useQuery} from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

type User = {
    id: number;
    name: string;
    phone: string;
}

export default function SimpleDialog(props: SimpleDialogProps) {
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