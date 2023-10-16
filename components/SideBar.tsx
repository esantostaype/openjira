import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';


import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']


export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu  } = useContext( UIContext );


    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>

            </Box>
            
        </Drawer>
    )
};