import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];
    addNewEntry: ( entry: Entry ) => void
    updateEntry: ( entry: Entry ) => void
    deleteEntry: ( _id: string ) => void
}

export const EntriesContext = createContext( {} as ContextProps );