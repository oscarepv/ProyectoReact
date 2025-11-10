//NavBar.tsx
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Mi Aplicación
                </Typography>

                <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>Inicio</Button>
               
                <Button color="inherit" component={Link} to="/about" startIcon={<HelpIcon />}>Acerca de</Button>
            </Toolbar>
        </AppBar>
    )
}


/*

 <Button color="inherit" component={Link} to="/posts" >Posts (todos)</Button>
<Button color="inherit" component={Link} to="/postsSingle" >Post (single)</Button>
*/
