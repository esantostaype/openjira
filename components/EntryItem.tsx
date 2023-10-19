import { DragEvent, FC, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button, IconButton, Card, CardActionArea, CardActions, CardContent, ListItem, Typography } from "@mui/material"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Entry } from "../interfaces"
import { UIContext } from "../context/ui";
import { dateFunctions } from "../utils";
import EntryEditModal from "./EntryEditModal";
import { useConfirm } from 'material-ui-confirm';
import { EntriesContext } from "../context/entries";

interface Props {
    entry: Entry;
}

export const EntryItem:FC<Props> = ({ entry }) => {

    const router = useRouter();

    const { setIsDraggingItem } = useContext( UIContext )

    const [ isModalOpen, setIsModalOpen ] = useState( false );

    const { deleteEntry } = useContext( EntriesContext );

    const confirm = useConfirm();

    const onDragStart = ( event: DragEvent ) => {
        console.log(event)
        event.dataTransfer.setData( 'id', entry._id );
        setIsDraggingItem( true );
    }

    const onDragEnd = () => {
        setIsDraggingItem( false );
    }

    // const onClick = () => {
    //     router.push( `/entries/${ entry._id }` );
    // }

    const onEdit = () => {
        setIsModalOpen(true);
    };

    const onDelete = () => {
        confirm({ description: `This will permanently delete ${entry.title}.` })
        .then(() => deleteEntry(entry._id))
        .catch(() => console.log("Deletion cancelled."));
    };

    return (
        <ListItem
            sx={{ padding: 0, paddingBottom: 1, paddingTop: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <Card sx={{ minWidth: '100%' }} /*onClick={ onClick }*/>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.title }</Typography>
                    <IconButton onClick={onDelete} sx={{ backgroundColor: 'error.dark',}}>
                        <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" size="small" onClick={ onEdit } startIcon={<EditOutlinedIcon />} sx={{ marginRight: 1 }} >
                        <Typography variant='inherit'>Edit</Typography>
                    </Button>
                    <Typography variant="body2">{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
                </CardActions>
            </Card>
            <EntryEditModal entry={entry} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </ListItem>
    )
}