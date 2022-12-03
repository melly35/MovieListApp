import ActionTypes from '../action-types';

const initialState = {
  movies: [],
  moviesDataLoading: false,
  moviesTotalResults: 0,
  moviesPageCount: 0,
  moviesCache: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  let response = action.response;

  switch (action.type) {
    case ActionTypes.movies.GET_MOVIES:
      return {
        ...state,
        movies: !action?.payload?.loadMore ? [] : [...state.movies],
        isLoading: true,
        moviesDataLoading: true,
      };
    case ActionTypes.movies.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, ...response.data],
        moviesTotalResults: response.totalResults,
        moviesPageCount: response.pageCount,
        moviesDataLoading: false,
        isLoading: false,
      };
    case ActionTypes.movies.GET_MOVIES_ERROR:
      return {
        ...state,
        movies: [],
        moviesTotalResults: 0,
        moviesPageCount: 0,
        isLoading: true,
        moviesDataLoading: false,
        error: false,
      };

    case ActionTypes.movies.GET_DETAIL_MOVIE:
      return {
        ...state,
        moviesCache: [...state.moviesCache],
        isLoading: true,
      };
    case ActionTypes.movies.GET_DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        moviesCache: [...state.moviesCache, response.data],
        isLoading: false,
      };
    case ActionTypes.movies.GET_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        isLoading: true,
        error: true,
      };

    default:
      return state;
  }
}
