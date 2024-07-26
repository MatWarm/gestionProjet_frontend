import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Box, Button } from '@mui/material';
import Annonces from './pages/Annonces';
import Login from './pages/Login';
import CreeCompte from "./pages/CreeCompte";
import AjouterAnnonce from './pages/AjoutAnnonce';
import ProtectedRoute from './ProtectedRoute';
import Cookies from 'js-cookie';

const drawerWidth = 240;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

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
              {!isAuthenticated && (
                <>
                  <ListItem button component={Link} to="/connexion">
                    <ListItemText primary="Connexion" />
                  </ListItem>
                  <ListItem button component={Link} to="/cree-compte">
                    <ListItemText primary="Nous rejoindre" />
                  </ListItem>
                </>
              )}
              {isAuthenticated && (
                <ListItem>
                  <LogoutButton setIsAuthenticated={setIsAuthenticated} />
                </ListItem>
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Routes>
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/connexion" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/cree-compte" element={<CreeCompte />} />
              <Route path="/ajouter-annonce" element={<ProtectedRoute element={AjouterAnnonce} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('mail');
    Cookies.remove('id');
    Cookies.remove('nom');
    Cookies.remove('prenom');
    setIsAuthenticated(false);
    navigate('/connexion');
  };

  return (
    <Button onClick={handleLogout} fullWidth variant="contained" color="secondary">
      Déconnexion
    </Button>
  );
};

export default App;
