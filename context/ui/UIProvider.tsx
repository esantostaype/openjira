import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
    children?: React.ReactNode
}

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingItem: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDraggingItem: false
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE );

    const openSideMenu = () => {
        dispatch({ type: '[UI] - Open Sidebar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: '[UI] - Close Sidebar' });
    }

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: '[UI] - Set isAddingEntry', payload: isAdding });
    }

    const setIsDraggingItem = ( isDragging: boolean ) => {
        dispatch({ type: '[UI] - Set isDraggingItem', payload: isDragging });
    }

    return (
        <UIContext.Provider value={{
            ...state,
            
            openSideMenu,
            closeSideMenu,
            
            setIsAddingEntry,

            setIsDraggingItem
        }}>
            { children }
        </UIContext.Provider>
    )
}