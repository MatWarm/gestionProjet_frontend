import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const userId = Cookies.get('id'); // Assurez-vous que l'ID du compte est stocké dans les cookies
      const token = Cookies.get('token'); // Récupérer le token JWT des cookies

      try {
        const response = await axios.get(`http://localhost:3001/reservation/profil/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajouter le token JWT dans les headers
          }
        });
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des réservations.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mes Réservations</Typography>
      <Grid container spacing={3}>
        {reservations.map((reservation) => {
          const startDate = dayjs(reservation.date_debut);
          const endDate = dayjs(reservation.date_fin);
          const duration = endDate.diff(startDate, 'day') + 1; // Inclure le jour de fin etdans le calcul
          console.log(duration);
          const cost = reservation.Annonce.prix_location * duration;

          return (
            <Grid item xs={12} md={6} key={reservation.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{reservation.Annonce.titre}</Typography>
                  <Typography>Date de début: {startDate.format('DD/MM/YYYY')}</Typography>
                  <Typography>Date de fin: {endDate.format('DD/MM/YYYY')}</Typography>
                  <Typography>Coût total: {cost} €</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default MesReservations;
