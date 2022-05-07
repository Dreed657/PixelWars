import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
} from '@mui/material';

const Layout = () => {
    return (
        <Box>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                            }}
                        >
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link
                                to="/admin"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Admin
                                </Button>
                            </Link>
                            <Link
                                to="/control"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Control
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default Layout;
