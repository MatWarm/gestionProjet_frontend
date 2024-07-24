import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Login() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <h1>Connexion</h1>
      <TextField label="Nom d'utilisateur" variant="outlined" margin="normal" />
      <TextField label="Mot de passe" type="password" variant="outlined" margin="normal" />
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Se connecter
      </Button>
    </Box>
  );
}

export default Login;
