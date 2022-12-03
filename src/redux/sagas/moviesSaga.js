import {put, call, takeLatest, delay, select} from 'redux-saga/effects';
import {GetMovies, GetMovieDetail} from '../../services/apiService';
import ActionTypes from '../action-types';

export function* getMovies({payload}) {
  try {
    const response = yield call(GetMovies, payload);
    if (response.success) {
      
      yield put({
        type: ActionTypes.movies.GET_MOVIES_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({type: ActionTypes.movies.GET_MOVIES_ERROR});
    }
  } catch (error) {
    console.log('err>', error);
  }
}

export function* getMovieDetail({payload}) {
  try {

    const response = yield call(GetMovieDetail, payload); 
    if (response.success) {
      yield put({
        type: ActionTypes.movies.GET_DETAIL_MOVIE_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({type: ActionTypes.movies.GET_DETAIL_MOVIE_ERROR});
    }
  } catch (error) {
    console.log('err?', error);
  }
}

const moviesSaga = [
  takeLatest(ActionTypes.movies.GET_MOVIES, getMovies),
  takeLatest(ActionTypes.movies.GET_DETAIL_MOVIE, getMovieDetail),
];

export default moviesSaga;
