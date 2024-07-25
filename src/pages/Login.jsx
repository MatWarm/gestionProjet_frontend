import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'

function Login() {
    // État pour gérer les valeurs des champs de texte
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction de gestionnaire d'événements pour le bouton
    const handleClick = async () => {
        // Créez l'objet avec les données de connexion
        const loginData = {
            mail: username,
            password: password
        };
        const url = 'http://localhost:3001';

        try {
            // Appel à l'API avec fetch
            console.log(loginData)
            const response = await fetch(url+"/compte/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('token', data.token,{expires: 1});
                console.log('Connexion réussie:', data);

                console.log(url+"/compte/"+username)
                const getInfoUtile = await fetch(url+"/compte/"+username, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':Cookies.get('token')
                    }
                });

                if(getInfoUtile.ok) {
                    const data = await getInfoUtile.json();
                    console.log(data);
                    Cookies.set('mail',data.mail,{expires: 1})
                    Cookies.set('id',data.id,{expires: 1})
                    Cookies.set('nom',data.nom,{expires: 1})
                    Cookies.set('prenom',data.prenom,{expires: 1})
                }else{
                    console.log("echec")
                }
            } else {
                console.error('Erreur de connexion:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
        }
    };

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
            <TextField
                label="Nom d'utilisateur"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Mot de passe"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
                onClick={handleClick}
            >
                Se connecter
            </Button>
        </Box>
    );
}

export default Login;
