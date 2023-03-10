import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {useState} from 'react'

const pages = ['Istoric devize', 'Crează deviz nou', 'Despre noi'];
const links = {
    'Istoric devize': "/istoric-devize",
    'Crează deviz nou': "/creare-deviz",
    'Despre noi': "/about"
}
function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {currentUser, logOut} = useAuth()
    const [error, setError] = useState('')

    async function handleLogOut() {
        setError('')
        try{
            await logOut()
        } catch{
            setError("Actiunea nu s-a putut efectua")
        }
    }
    if (currentUser)
    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/istoric-devize" style= {{ textDecoration: 'none', color: "white"}} >

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        deviz.me
                    </Typography>

                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'grid', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={links[page]} style={{ textDecoration: 'none' }}>

                                <Button
                                    key={page}

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>

                            </Link>

                        ))}
                    </Box>
                    {
                        currentUser && <Typography>
                            {currentUser.email}
                        </Typography>
                    }
                    {
                        currentUser && <Button
                        onClick = {handleLogOut}

                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Log Out
                    </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
    else return (<></>)
}
export default Navbar;