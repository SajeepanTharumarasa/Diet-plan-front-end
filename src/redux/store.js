import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dietReducer from './diet/diet.reducer';

const rootReducer = combineReducers({
	diet: dietReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
