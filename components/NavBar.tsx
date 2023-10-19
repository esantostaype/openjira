import { useContext } from 'react';
import Link from "next/link";
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
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
                <Link href='/' passHref>
                    <Typography variant='h6'>OpenJira</Typography>
                </Link>
            </Toolbar>        
        </AppBar>
    )
}