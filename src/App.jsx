import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { createTheme } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import Annonces from './pages/Annonces';
import Login from './pages/Login';
// import Profil from './Profil';
// import MesReservations from './MesReservations';
import AjouterAnnonce from './pages/AjoutAnnonce';

const drawerWidth = 240;

function App() {
  return (
    <div>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <List>
              <ListItem button component={Link} to="/annonces">
                <ListItemText primary="Annonces" />
              </ListItem>
              <ListItem button component={Link} to="/profil">
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem button component={Link} to="/mes-reservations">
                <ListItemText primary="Mes reservations" />
              </ListItem>
              <ListItem button component={Link} to="/ajouter-annonce">
                <ListItemText primary="Ajouter annonce" />
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Routes>
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/" element={<Login />} />
              {/* <Route path="/profil" element={<Profil />} /> */}
              {/* <Route path="/mes-reservations" element={<MesReservations />} /> */}
              <Route path="/ajouter-annonce" element={<AjouterAnnonce />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
