import React from 'react';
import { Container, CssBaseline, Box, Tab, Tabs } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS } from 'date-fns/locale';
import { ReservationForm } from './components/ReservationForm';
import { ReservationList } from './components/ReservationList';

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
            <CssBaseline />
            <Container>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                    >
                        <Tab label="New Reservation" />
                        <Tab label="My Reservations" />
                    </Tabs>
                </Box>

                {value === 0 && <ReservationForm />}
                {value === 1 && <ReservationList />}
            </Container>
        </LocalizationProvider>
    );
}

export default App;
