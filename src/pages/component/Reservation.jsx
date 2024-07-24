import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/fr';

function Reservation({ annonce }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (endDate && startDate && endDate.isBefore(startDate)) {
      setError('La date de fin ne peut pas être avant la date de début. Veuillez rectifier.');
      return;
    }
    setError('');
    // Logique de réservation
    console.log('Réservation effectuée:', { startDate, endDate });
  };

  if (!annonce) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
        <Typography variant="h6">Réservation pour {annonce.title}</Typography>
        <DatePicker
          label="Début de la réservation"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
        <DatePicker
          label="Fin de la réservation"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} margin="normal" />}
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
  );
}

export default Reservation;
