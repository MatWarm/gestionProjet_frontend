import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';

function Annonces() {
  const annonces = [
    { id: 1, title: 'Location de voiture - Renault Clio', description: 'Renault Clio 2020, 50€/jour' },
    { id: 2, title: 'Location de voiture - Peugeot 208', description: 'Peugeot 208 2019, 45€/jour' },
    // Ajoutez plus d'annonces ici
  ];

  return (
    <Container>
      <h1>Annonces de locations de voiture</h1>
      {annonces.map((annonce) => (
        <Card key={annonce.id} style={{ marginTop: '16px' }}>
          <CardContent>
            <Typography variant="h5">{annonce.title}</Typography>
            <Typography variant="body2">{annonce.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Annonces;
