import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface Props {
    children?: React.ReactNode
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const router = useRouter();

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Add Entry', payload: data });
    }

    const updateEntry = async( { _id, description, status }: Entry ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status  });
            dispatch({ type: '[Entry] - Update Entry', payload: data });
            enqueueSnackbar( `Entry "${description.substring( 0,20 ) + '...'}" Updated Successfully`, {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            } );
            router.push( `/` );
        }
        catch( error ) {
            console.log({ error });
        }
        
    }

    const getEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Get Entries', payload: data });
    }

    useEffect(() => {
        getEntries();
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}