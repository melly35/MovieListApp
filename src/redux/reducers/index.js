import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';

const reducers = combineReducers({
    moviesReducer: moviesReducer,
});

export default reducers;