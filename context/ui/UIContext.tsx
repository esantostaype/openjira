import { createContext } from 'react';

interface ContextProps {

    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingItem: boolean;
    
    closeSideMenu: () => void;
    openSideMenu: () => void;

    setIsAddingEntry: ( isAdding: boolean ) => void;

    setIsDraggingItem: ( isDragging: boolean ) => void;
}

export const UIContext = createContext( {} as ContextProps );