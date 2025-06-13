import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { Table, createReservation, getTables } from '../services/api';

export const ReservationForm: React.FC = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTable, setSelectedTable] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [guests, setGuests] = useState<number>(1);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await getTables();
                setTables(response.data);
            } catch (err) {
                setError('Error loading tables');
            }
        };
        fetchTables();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTable || !selectedDate || !selectedTime) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await createReservation({
                table_id: selectedTable,
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: format(selectedTime, 'HH:mm'),
                number_of_guests: guests,
            });
            setSelectedTable(0);
            setSelectedDate(null);
            setSelectedTime(null);
            setGuests(1);
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Error making reservation');
        }
    };

    return (
        <Paper sx={{ p: 3, mt: 3, maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                New Reservation
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Table</InputLabel>
                    <Select
                        value={selectedTable}
                        label="Table"
                        onChange={(e) => setSelectedTable(Number(e.target.value))}
                    >
                        <MenuItem value={0}>Select a table</MenuItem>
                        {tables.map((table) => (
                            <MenuItem key={table.id} value={table.id}>
                                Table {table.number} (Capacity: {table.capacity})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ mb: 2 }}>
                        <DatePicker
                            label="Date"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TimePicker
                            label="Time"
                            value={selectedTime}
                            onChange={(newValue) => setSelectedTime(newValue)}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                        />
                    </Box>
                </LocalizationProvider>
                <TextField
                    type="number"
                    fullWidth
                    size="small"
                    label="Number of guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    sx={{ mb: 2 }}
                    InputProps={{ inputProps: { min: 1 } }}
                />
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="medium"
                >
                    RESERVE
                </Button>
            </form>
        </Paper>
    );
}; 