import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
// import DetailAnnonce from './components/DetailAnnonce';
import Reservation from './component/Reservation';

function Annonces() {
  const [openDetail, setOpenDetail] = useState(false);
  const [openReservation, setOpenReservation] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const annonces = [
    { id: 1, title: 'Location de voiture - Renault Clio', description: 'Renault Clio 2020, 50€/jour' },
    { id: 2, title: 'Location de voiture - Peugeot 208', description: 'Peugeot 208 2019, 45€/jour' },
    // Ajoutez plus d'annonces ici
  ];

  const handleOpenDetail = (annonce) => {
    setSelectedAnnonce(annonce);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOpenReservation = (annonce) => {
    setSelectedAnnonce(annonce);
    setOpenReservation(true);
  };

  const handleCloseReservation = () => {
    setOpenReservation(false);
  };

  return (
    <Container>
      <h1>Annonces de locations de voiture</h1>
      {annonces.map((annonce) => (
        <Card key={annonce.id} style={{ marginTop: '16px' }}>
          <CardContent>
            <Typography variant="h5">{annonce.title}</Typography>
            <Typography variant="body2">{annonce.description}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenDetail(annonce)} style={{ margin: '8px' }}>
              Détail
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleOpenReservation(annonce)} style={{ margin: '8px' }}>
              Réserver
            </Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDetail} onClose={handleCloseDetail}>
        <DialogTitle>Détails de l'annonce</DialogTitle>
        <DialogContent>
          {/* <DetailAnnonce annonce={selectedAnnonce} /> */}
        </DialogContent>
      </Dialog>
      <Dialog open={openReservation} onClose={handleCloseReservation}>
        <DialogTitle>Réservation</DialogTitle>
        <DialogContent>
          <Reservation annonce={selectedAnnonce} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Annonces;
