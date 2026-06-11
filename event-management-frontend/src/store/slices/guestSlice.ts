import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { Guest } from '../../types';

interface GuestState {
  guests: Guest[];
  loading: boolean;
  error: string | null;
}

const initialState: GuestState = {
  guests: [],
  loading: false,
  error: null,
};

export const fetchGuests = createAsyncThunk('guests/fetchGuests', async () => {
  const response = await api.get('/guests');
  return response.data;
});

export const createGuest = createAsyncThunk('guests/createGuest', async (guestData: Partial<Guest>) => {
  const response = await api.post('/guests', guestData);
  return response.data;
});

export const deleteGuest = createAsyncThunk('guests/deleteGuest', async (id: number) => {
  await api.delete(`/guests/${id}`);
  return id;
});

const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload);
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter(guest => guest.id !== action.payload);
      });
  },
});

export default guestSlice.reducer;