// src/pages/CreateAdPage.js

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';



const AjouterAnnonce = () => {
    const navigate = useNavigate ();

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        ville: '',
        cp: '',
        marque: '',
        nbr_place: 5,
    });

    const validateData = () => {
        const cpRegex = /^[0-9]+$/;
        const nbr_placeRegex = /^[0-9]+$/;
    
        if (!cpRegex.test(formData.cp)) {
          alert('Le code postal doit contenir uniquement des chiffres.');
          return false;
        }
    
        if (!nbr_placeRegex.test(formData.nbr_place)) {
          alert('Le nombre de places doit contenir uniquement des chiffres.');
          return false;
        }
    
        return true;
      };
    
      const sanitizeInput = (input) => {
        const div = document.createElement('div');
        div.innerText = input;
        return div.innerHTML;
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateData()) {
          return;
        }
    
        // Sanitize text inputs
        const sanitizedData = {
          ...formData,
          titre: sanitizeInput(formData.titre),
          description: sanitizeInput(formData.description),
          ville: sanitizeInput(formData.ville),
          marque: sanitizeInput(formData.marque),
          id_compte: 1,
        };

        try {
            const response = await axios.post('http://127.0.0.1:3001/annonce', sanitizedData);
            console.log('Annonce créée:', response.data);
            navigate('/annonces')
        } catch (error) {
            console.error('Erreur lors de la création de l\'annonce', error);
            alert('Erreur lors de la création de l\'annonce. Veuillez réessayer.');
        }
    
        // Handle form submission logic here
        console.log('Sanitized Form Data:', sanitizedData);
      };
    

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Créer une annonce
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Titre de l'annonce"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Détail de l'annonce"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Ville"
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Code Postal"
                            name="cp"
                            value={formData.cp}
                            onChange={handleChange}
                            fullWidth
                            required
                            type="input"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Marque de la voiture"
                            name="marque"
                            value={formData.marque}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <InputLabel id="place-label">Nombre de places</InputLabel>
                            <Select
                                labelId="place-label"
                                name="nbr_place"
                                value={formData.nbr_place}
                                onChange={handleChange}
                                label="Nombre de places"
                                required 
                                fullWidth
                            >
                                <MenuItem value={1}>1 place</MenuItem >
                                <MenuItem value={2}>2 places</MenuItem >
                                <MenuItem value={3}>3 places</MenuItem >
                                <MenuItem value={4}>4 places</MenuItem >
                                <MenuItem value={5}>5 places</MenuItem >
                                <MenuItem value={6}>6 places</MenuItem >
                                <MenuItem value={7}>7 places</MenuItem >
                                <MenuItem value={8}>8 places</MenuItem >
                            </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Créer l'annonce
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AjouterAnnonce;
