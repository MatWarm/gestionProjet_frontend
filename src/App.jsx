import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import Annonces from './pages/Annonces';
import Login from './pages/Login';
import CreeCompte from "./pages/CreeCompte";
import AjouterAnnonce from './pages/AjoutAnnonce';
import ProtectedRoute from './ProtectedRoute'; // Importer le composant de route protégée
import Cookies from 'js-cookie';

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
              <ListItem button component={Link} to="/connexion">
                <ListItemText primary="Connexion" />
              </ListItem>
              <ListItem button component={Link} to="/cree-compte">
                <ListItemText primary="Nous rejoindre" />
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Routes>
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/cree-compte" element={<CreeCompte />} />
              <Route path="/ajouter-annonce" element={<ProtectedRoute element={AjouterAnnonce} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
