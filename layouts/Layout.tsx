import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { NavBar, Sidebar } from '../components';

interface Props {
    title?: String;
    children: any;
}

export const Layout:FC<Props> = ({ title = 'OpenJira - App', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{ title }</title>
            </Head>
            <NavBar/>
            <Sidebar />
            <Box sx={{ padding: '40px', height: 'calc(100vh - 65px)' }}>
                { children }
            </Box>
        </Box>
    )
}