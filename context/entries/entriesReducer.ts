import { EntriesState } from '.';

type EntriesActionType = 
| { type: '[Entries] - ActionName' }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {
    
    switch ( action.type ) {
        // case '[Entries] - Open Sidebar':
        //     return {
        //         ...state,
        //         sidemenuOpen: true
        //     }
        // case '[Entries] - Close Sidebar':
        //     return {
        //         ...state,
        //         sidemenuOpen: false
        //     }
        
        default:
            return state;
    }
    
}