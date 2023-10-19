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

    const addNewEntry = async( { title, description }: Entry ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { title, description });
        dispatch({ type: '[Entry] - Add Entry', payload: data });
        enqueueSnackbar( "Entry Created Successfully", {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        } );
    }

    const updateEntry = async( { _id, title, description, status }: Entry ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { title, description, status  });
            dispatch({ type: '[Entry] - Update Entry', payload: data });
            enqueueSnackbar( `Entry Updated Successfully`, {
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

    const deleteEntry = async( _id: string ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`);
            dispatch({ type: '[Entry] - Update Entry', payload: data });
            enqueueSnackbar( `Entry Deleted Successfully`, {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            } );
            getEntries();
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
            updateEntry,
            deleteEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}