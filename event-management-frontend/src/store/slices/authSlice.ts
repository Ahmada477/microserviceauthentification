import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/api';
import { User, LoginRequest, RegisterRequest } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined' && userStr !== 'null') {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du parsing de user:', error);
    return null;
  }
};

const getStoredToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined' && token !== 'null') {
    return token;
  }
  return null;
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      const data = response.data;
      
      console.log('📦 Réponse brute du backend:', data);
      
      // Ton backend retourne: { accessToken, refreshToken }
      const token = data.accessToken;
      const refreshToken = data.refreshToken;
      
      if (!token) {
        throw new Error('Token non reçu');
      }
      
      // Extraire les informations du token JWT
      let userRole: 'ADMIN' | 'ORGANIZER' | 'USER' = 'USER';
      let userId = 0;
      let username = credentials.username;
      
      try {
        // Décoder le token JWT pour extraire le rôle
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('📦 Payload du token:', payload);
        
        // Convertir le rôle en type correct
        const extractedRole = payload.role || 'USER';
        if (extractedRole === 'ADMIN' || extractedRole === 'ORGANIZER' || extractedRole === 'USER') {
          userRole = extractedRole;
        }
        userId = payload.id || 0;
        username = payload.sub || credentials.username;
        
        console.log('🎭 Rôle extrait:', userRole);
        console.log('👤 Username:', username);
      } catch (e) {
        console.error('Erreur lors du décodage du token:', e);
      }
      
      // Créer l'objet user
      const user: User = {
        id: userId,
        username: username,
        email: '',
        firstName: '',
        lastName: '',
        role: userRole,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('👤 User créé:', user);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } catch (error: any) {
      console.error('❌ Erreur login:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      const data = response.data as any; // Utiliser any pour contourner temporairement
      
      console.log('📦 Réponse register:', data);
      
      // Essayer de récupérer le token de différentes façons
      const token = data.accessToken || data.token || null;
      const refreshToken = data.refreshToken || null;
      
      // Créer l'utilisateur
      const user: User = {
        id: data.id || Date.now(),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('👤 User créé:', user);
      
      if (token) {
        localStorage.setItem('token', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return { token, user };
    } catch (error: any) {
      console.error('❌ Erreur register:', error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        console.log('✅ Login réussi, user:', state.user);
        console.log('✅ Rôle:', state.user?.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('❌ Login rejeté:', action.payload);
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        state.error = null;
        console.log('✅ Register réussi, user:', state.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('❌ Register rejeté:', action.payload);
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;