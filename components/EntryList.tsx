import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper, Typography } from '@mui/material';
import { EntryItem } from './';
import { EntryStatus } from '../interfaces';
import { EntriesContext } from '../context/entries';
import { UIContext } from '../context/ui';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDraggingItem, setIsDraggingItem } = useContext( UIContext )

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] );

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData( 'id' );
        const entry = entries.find( e => e._id === id )!;
        entry.status = status;
        updateEntry( entry );
        setIsDraggingItem( false );
    }

    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className= { isDraggingItem ? 'dragging' : '' }
        >
            <List sx={{ padding: 0, marginTop: -1, marginBottom: -2, minHeight: '100px' }}>
                {
                    entriesByStatus.map( entry => (
                        <EntryItem key={ entry._id } entry={ entry } />
                    ) )
                }
            </List>
        </div>
    )
}