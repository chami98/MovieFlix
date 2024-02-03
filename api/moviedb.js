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

// Function to make an asynchronous API call
const apiCall = async (endpoint, params) => {
    // Constructing request options
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {} // If params exist, assign them; otherwise, assign an empty object
    };

    try {
        // Sending the request and waiting for response
        const response = await axios.request(options);
        return response.data; // Returning response data
    } catch (error) {
        console.log('error: ', error); // Logging any errors
        return {}; // Returning an empty object in case of error
    }
}

// Home screen APIs
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint); // Calling API to fetch trending movies
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint); // Calling API to fetch upcoming movies
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint); // Calling API to fetch top-rated movies
}

// Movie screen APIs
export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id)); // Calling API to fetch movie details by ID
}
export const fetchMovieCredits = (movieId) => {
    return apiCall(movieCreditsEndpoint(movieId)); // Calling API to fetch movie credits by movie ID
}
export const fetchSimilarMovies = (movieId) => {
    return apiCall(similarMoviesEndpoint(movieId)); // Calling API to fetch similar movies by movie ID
}

// Person screen APIs
export const fetchPersonDetails = (personId) => {
    return apiCall(personDetailsEndpoint(personId)); // Calling API to fetch person details by ID
}
export const fetchPersonMovies = (personId) => {
    return apiCall(personMoviesEndpoint(personId)); // Calling API to fetch movies associated with a person by ID
}

// Search screen APIs
export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params); // Calling API to search for movies with given parameters
}

