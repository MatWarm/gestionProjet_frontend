import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Container, Card, CardContent, Typography, Button } from '@mui/material';
// import DetailAnnonce from './components/DetailAnnonce';
import Reservation from './component/Reservation';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie'

function Annonces() {
  const navigate = useNavigate()
  const [annonces, setAnnonces] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [openReservation, setOpenReservation] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);


  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/annonce/');
        console.log(response.data);
        setAnnonces(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces', error);
      }
    };

    fetchAnnonces();
  }, []);

  const handleOpenDetail = (annonce) => {
    setSelectedAnnonce(annonce);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOpenReservation = (annonce) => {
    if (!Cookies.get('token')) {
      navigate('/connexion')
    }
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
            <Typography variant="h5">{annonce.titre}</Typography>
            <Typography variant="body2">{annonce.description}</Typography>
            <Typography variant="body2">{annonce.prix_location} € / jour</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleOpenReservation(annonce)} style={{ margin: '8px' }}>
              Réserver
            </Button>
          </CardContent>
        </Card>
      ))}
      <Reservation open={openReservation} onClose={handleCloseReservation} annonce={selectedAnnonce} />
    </Container>
  );
}

export default Annonces;
