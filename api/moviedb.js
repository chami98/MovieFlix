import axios from "axios";
import { apiKey } from "../constants";


// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'; // Base URL for the Movie Database API
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`; // Endpoint to fetch trending movies
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`; // Endpoint to fetch upcoming movies
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`; // Endpoint to fetch top-rated movies
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`; // Endpoint to search for movies

// endpoints with dynamic params

// movie
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`; // Endpoint to fetch details of a specific movie
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`; // Endpoint to fetch credits of a specific movie
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`; // Endpoint to fetch similar movies of a specific movie

// person
const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`; // Endpoint to fetch details of a specific person
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`; // Endpoint to fetch movies associated with a specific person

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null; // Function to get an image of width 500
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null; // Function to get an image of width 342
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null; // Function to get an image of width 185



// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

// home screen apis
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}


// movie screen apis
export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId) => {
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId) => {
    return apiCall(similarMoviesEndpoint(movieId));
}

// person screen apis
export const fetchPersonDetails = (personId) => {
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId) => {
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}
