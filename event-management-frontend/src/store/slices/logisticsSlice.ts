import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { Logistics } from '../../types';

interface LogisticsState {
  logistics: Logistics[];
  loading: boolean;
  error: string | null;
}

const initialState: LogisticsState = {
  logistics: [],
  loading: false,
  error: null,
};

export const fetchLogistics = createAsyncThunk('logistics/fetchLogistics', async () => {
  const response = await api.get('/logistics');
  return response.data;
});

export const createLogistics = createAsyncThunk('logistics/createLogistics', async (data: Partial<Logistics>) => {
  const response = await api.post('/logistics', data);
  return response.data;
});

export const updateLogisticsStatus = createAsyncThunk('logistics/updateLogisticsStatus', async ({ id, status }: { id: number; status: string }) => {
  const response = await api.put(`/logistics/${id}/status?status=${status}`);
  return response.data;
});

export const deleteLogistics = createAsyncThunk('logistics/deleteLogistics', async (id: number) => {
  await api.delete(`/logistics/${id}`);
  return id;
});

const logisticsSlice = createSlice({
  name: 'logistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogistics.fulfilled, (state, action) => {
        state.loading = false;
        state.logistics = action.payload;
      })
      .addCase(fetchLogistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(createLogistics.fulfilled, (state, action) => {
        state.logistics.push(action.payload);
      })
      .addCase(updateLogisticsStatus.fulfilled, (state, action) => {
        const index = state.logistics.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.logistics[index] = action.payload;
        }
      })
      .addCase(deleteLogistics.fulfilled, (state, action) => {
        state.logistics = state.logistics.filter(l => l.id !== action.payload);
      });
  },
});

export default logisticsSlice.reducer;