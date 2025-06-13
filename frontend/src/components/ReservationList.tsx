import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
    Reservation,
    getReservations,
    addComment,
    cancelReservation,
} from '../services/api';

export const ReservationList: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string>('');
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<number | null>(
        null
    );
    const [comment, setComment] = useState('');

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            setReservations(response.data);
        } catch (err) {
            setError('Error loading reservations');
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleAddComment = async () => {
        if (!selectedReservation || !comment.trim()) return;

        try {
            await addComment(selectedReservation, comment);
            setCommentDialogOpen(false);
            setComment('');
            fetchReservations();
        } catch (err) {
            setError('Error adding comment');
        }
    };

    const handleCancel = async (reservationId: number) => {
        try {
            await cancelReservation(reservationId);
            fetchReservations();
        } catch (err) {
            setError('Error cancelling reservation');
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Reservations
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            {reservations.map((reservation) => (
                <Card key={reservation.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">
                            Table {reservation.table.number} (Capacity: {reservation.table.capacity})
                        </Typography>
                        <Typography>
                            Date: {format(new Date(reservation.date), 'PPP', { locale: enUS })}
                        </Typography>
                        <Typography>
                            Time: {format(new Date(`2000-01-01T${reservation.time}`), 'p', { locale: enUS })}
                        </Typography>
                        <Typography>
                            Number of guests: {reservation.number_of_guests}
                        </Typography>
                        <Typography>
                            Status: {reservation.status}
                        </Typography>
                        {reservation.comments && reservation.comments.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">Comments:</Typography>
                                {reservation.comments.map((comment, index) => (
                                    <Typography key={index} variant="body2">
                                        {comment.content}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                onClick={() => {
                                    setSelectedReservation(reservation.id);
                                    setCommentDialogOpen(true);
                                }}
                                variant="outlined"
                                sx={{ mr: 1 }}
                            >
                                Add Comment
                            </Button>
                            {reservation.status === 'pending' && (
                                <Button
                                    onClick={() => handleCancel(reservation.id)}
                                    color="error"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            ))}
            <Dialog
                open={commentDialogOpen}
                onClose={() => setCommentDialogOpen(false)}
            >
                <DialogTitle>Add a Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCommentDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddComment} variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}; 