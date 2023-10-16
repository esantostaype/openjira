import { useContext } from 'react';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../context/ui';

export const NavBar = () => {

    const { openSideMenu } = useContext( UIContext );

    return (
        <AppBar position='sticky' elevation={ 0 }>
            <Toolbar>
                <IconButton onClick={ openSideMenu } >
                    <MenuOutlinedIcon/>
                </IconButton>
            </Toolbar>        
        </AppBar>
    )
}