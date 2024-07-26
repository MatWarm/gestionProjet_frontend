import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function CreeCompte() {
    const [name, setName] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Définir la fonction de gestionnaire d'événements
    const handleClick = () => {
        if (!validatePassword(password)) {
            setError('Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, ' +
                'une minuscule, un chiffre et un caractère spéciale.');
            return;
        }
        setError('');
        const data = {
            nom: name,
            prenom: prenom,
            mail: email,
            password: password
        };
        const url = 'http://localhost:3001';
        fetch(url + '/compte/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                console.log('Compte créé');
            } else {
                console.error('Erreur lors de la création du compte');
            }
        }).catch(error => {
            console.error('Erreur de réseau:', error);
        });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,}$/;
        return passwordRegex.test(password);
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
            <h1>Créer son compte</h1>
            <TextField
                label="Nom "
                variant="outlined"
                margin="normal"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Prenom"
                variant="outlined"
                margin="normal"
                onChange={(e) => setPrenom(e.target.value)}
            />
            <TextField
                label="Mail"
                variant="outlined"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Mot de passe"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error}/>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
                onClick={handleClick} // Attacher l'événement onClick
            >
                Créer
            </Button>
        </Box>
    );
}

export default CreeCompte;
