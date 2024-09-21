import { combineReducers } from 'redux';
import authReducer from './features/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
