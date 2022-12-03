import ActionTypes from "../action-types";


const getMovies = (payload) => {  
    return {
        type : ActionTypes.movies.GET_MOVIES,
        payload
    }
}

const getMovieDetail = (payload) => {  
    return {
        type : ActionTypes.movies.GET_DETAIL_MOVIE,
        payload
    }
}


const movieAction = {
    getMovies,
    getMovieDetail
};

export default movieAction;