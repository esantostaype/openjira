import { DragEvent, FC, useContext } from "react";
import { Card, CardActionArea, CardActions, CardContent, ListItem, Typography } from "@mui/material"
import { Entry } from "../interfaces"
import { UIContext } from "../context/ui";

interface Props {
    entry: Entry;
}

export const EntryItem:FC<Props> = ({ entry }) => {

    const { isDraggingItem, setIsDraggingItem } = useContext( UIContext )

    const onDragStart = ( event: DragEvent ) => {
        console.log(event)
        event.dataTransfer.setData( 'id', entry._id );
        setIsDraggingItem( true );
    }

    const onDragEnd = () => {
        setIsDraggingItem( false );
    }

    return (
        <ListItem
            sx={{ padding: 0, paddingBottom: 1, paddingTop: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <Card sx={{ minWidth: '100%' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Typography variant="body2">hace 30 minutos</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
        </ListItem>
    )
}