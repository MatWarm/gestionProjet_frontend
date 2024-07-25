import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';
import axios from 'axios';

function Reservation({ open, onClose, annonce, }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (annonce && open) {
            const fetchReservations = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/reservation/voiture/${annonce.id}`);
                    console.log(response.data);
                    setReservations(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des réservations', error);
                }
            };

            fetchReservations();
        }
    }, [annonce, open]);

    const handleReserve = async () => {
        if (endDate && startDate && endDate.isBefore(startDate)) {
            setError('La date de fin ne peut pas être avant la date de début. Veuillez rectifier.');
            return;
        }
        setError('');
        // Logique de réservation

        try {
            const response = await axios.post('http://127.0.0.1:3001/reservation', {
              date_debut: startDate.valueOf(),
              date_fin: endDate.valueOf(),
              id_compte: 1, // ID de l'utilisateur connecté
              id_annonce: annonce.id, // ID de l'annonce
            });
            console.log('Réservation effectuée:', response.data);
            onClose(); // Fermer le dialogue après la réservation
          } catch (error) {
            console.error('Erreur lors de la réservation', error);
            setError('Erreur lors de la réservation. Veuillez réessayer.');
          }

        console.log('Réservation effectuée:', {
            startDate: startDate ? startDate.valueOf() : null,
            endDate: endDate ? endDate.valueOf() : null
        });


    };

    const shouldDisableDate = (date) => {
        return reservations.some(reservation => {
          const startDate = dayjs(reservation.date_debut);
          const endDate = dayjs(reservation.date_fin);
          return date.isSame(startDate, 'day') || date.isSame(endDate, 'day') || date.isBetween(startDate, endDate, null, '[]');
        });
      };
      

    // const today = dayjs()
    const tomorrow = dayjs().add(1, 'day')

    if (!annonce) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Réservation</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
                        <Typography variant="h6">Réservation pour {annonce.title}</Typography>
                        <DatePicker
                            label="Début de la réservation"
                            defaultValue={tomorrow}
                            minDate={tomorrow}
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                                setEndDate(null); // Reset end date if start date changes
                            }}
                            shouldDisableDate={shouldDisableDate}
                            renderInput={(params) => <TextField {...params} margin="normal" />}
                        />
                        <DatePicker
                            label="Fin de la réservation"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            minDate={startDate}
                            renderInput={(params) => <TextField {...params} margin="normal" />}
                            disabled={!startDate} // Disable end date picker if no start date
                        shouldDisableDate={shouldDisableDate}
                        />
                        {error && (
                            <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>
                                {error}
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" onClick={handleReserve} style={{ marginTop: '16px' }}>
                            Réserver
                        </Button>
                    </Box>
                </LocalizationProvider>
            </DialogContent>
        </Dialog>

    );
}

export default Reservation;
