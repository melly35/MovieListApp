import axios from 'axios';
import {AppConfig} from '../config/app-config';

export async function GetMovies(payload) {
  try {
    let url = `${AppConfig.API_URL}?apiKey=${AppConfig.API_KEY}&${payload.controller}=${payload.searchText}&page=${payload.pageNumber}`;

    let options = {
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get',
    };

    const res = await axios(options);

    if (res.status == 200 && res.data.Response == 'True' && payload?.searchText) {
      return {
        success: true,
        data: {
          data: res.data.Search,
          totalResults: res.data.totalResults,
          pageCount: Math.round(res.data.totalResults / 10)
        },
      };
    } else {
      return {
        error: true,
        errorMessage: 'error.unknown_error',
        errorMessageTechnical:
          'Unknown response status. status: ' + res.data.status,
      };
    }
  } catch (error) {
    console.log('--', error);

    return {
      error: true,
      data: null,
      errorMessage: 'error.unknown_error',
      errorMessageTechnical: error?.message,
    };
  }
}

export async function GetMovieDetail(payload) {
  try {
    let url = `${AppConfig.API_URL}?apiKey=${AppConfig.API_KEY}&i=${payload.id}`;

    let options = {
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get',
    };

    const res = await axios(options);
    if (res.status == 200 && res.data) {
      return {
        success: true,
        data: {
          data: res.data,
        },
      };
    } else {
      return {
        error: true,
        errorMessage: 'error.unknown_error',
        errorMessageTechnical:
          'Unknown response status. status: ' + res.data.status,
      };
    }
  } catch (error) {
    console.log('--', error);

    return {
      error: true,
      data: null,
      errorMessage: 'error.unknown_error',
      errorMessageTechnical: error?.message,
    };
  }
}
