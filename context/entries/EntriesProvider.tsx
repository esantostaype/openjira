import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    children?: React.ReactNode
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Dictumst erat fringilla malesuada nulla primis sem semper taciti venenatis. Commodo elementum eros euismod felis iaculis luctus magna nisi odio quis sollicitudin ultricies vehicula.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'In Progress: Aliquet blandit commodo condimentum convallis dictumst hendrerit inceptos laoreet neque pulvinar sagittis varius. Aptent augue bibendum diam dictumst dolor euismod felis habitasse himenaeos laoreet litora ridiculus rutrum.',
            status: 'pending',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Finished: Amet aptent cras cubilia diam dignissim egestas facilisis feugiat gravida iaculis ipsum libero litora lobortis maecenas metus mollis nostra per phasellus praesent sit sociis tempor velit vitae.',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
            { children }
        </EntriesContext.Provider>
    )
}