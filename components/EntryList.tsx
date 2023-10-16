import { FC, useContext, useMemo } from 'react';
import { List, Paper, Typography } from '@mui/material';
import { EntryItem } from './';
import { EntryStatus } from '../interfaces';
import { EntriesContext } from '../context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries } = useContext( EntriesContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] );

    return (
        <div>
            <Paper sx={{ overflow: 'auto', background: 'transparent' }} elevation={ 0 }>
                <List sx={{ opacity: 1 }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryItem key={ entry._id } entry={ entry } />
                        ) )
                    }
                </List>
            </Paper>
        </div>
    )
}