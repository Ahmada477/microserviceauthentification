// src/store/slices/registrationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { Registration } from '../../types';

interface RegistrationState {
  registrations: Registration[];
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  registrations: [],
  loading: false,
  error: null,
};

export const fetchRegistrations = createAsyncThunk('registrations/fetchRegistrations', async () => {
  const response = await api.get('/registrations');
  return response.data;
});

// Version qui accepte les inscriptions directes USER et les inscriptions ADMIN/ORGANIZER
export const createRegistration = createAsyncThunk(
  'registrations/createRegistration',
  async (data: { 
    eventId: number; 
    guestId?: number; 
    guestName?: string; 
    guestEmail?: string; 
    userName?: string; 
    userId?: number;
  }, { rejectWithValue }) => {
    try {
      console.log('📦 Données reçues dans createRegistration:', data);
      
      let payload: any = {
        eventId: data.eventId
      };
      
      // Si guestId est fourni (pour ADMIN/ORGANIZER)
      if (data.guestId) {
        payload.guestId = data.guestId;
      } 
      // Sinon pour USER (inscription directe)
      else {
        payload.guestName = data.guestName || 'Inconnu';
        payload.guestEmail = data.guestEmail || '';
        payload.userName = data.userName || '';
        payload.userId = data.userId || 0;
      }
      
      const response = await api.post('/registrations', payload);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur createRegistration:', error);
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  }
);

export const cancelRegistration = createAsyncThunk('registrations/cancelRegistration', async (id: number) => {
  await api.put(`/registrations/cancel/${id}`);
  return id;
});

export const checkInRegistration = createAsyncThunk('registrations/checkInRegistration', async (id: number) => {
  const response = await api.post(`/registrations/${id}/checkin`);
  return response.data;
});

const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur';
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.registrations.push(action.payload);
      })
      .addCase(createRegistration.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(cancelRegistration.fulfilled, (state, action) => {
        const registration = state.registrations.find(r => r.id === action.payload);
        if (registration) {
          registration.status = 'CANCELLED';
        }
      })
      .addCase(checkInRegistration.fulfilled, (state, action) => {
        const index = state.registrations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.registrations[index] = action.payload;
        }
      });
  },
});

export default registrationSlice.reducer;