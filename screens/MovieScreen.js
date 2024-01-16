import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import { styles, theme } from '../theme';
import Loading from '../components/loading';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    // Use the route hook from react-navigation to get the parameters passed to this screen
    const { params: item } = useRoute();
    // Use the navigation hook from react-navigation
    const navigation = useNavigation();
    // State variable for the movie details, with initial value as an empty object
    const [movie, setMovie] = useState({});
    // State variable for cast members, with initial values as an empty array
    const [cast, setCast] = useState([]);
    // State variable for similar movies, with initial values as an empty array
    const [similarMovies, setSimilarMovies] = useState([]);
    // State variable for favorite status, with initial value as false
    const [isFavourite, toggleFavourite] = useState(false);
    // State variable for loading status, with initial value as false
    const [loading, setLoading] = useState(false);


    // Use effect hook to fetch movie details, credits, and similar movies when the component mounts
    useEffect(() => {
        // Set loading to true
        setLoading(true);
        // Fetch movie details
        getMovieDetials(item.id);
        // Fetch movie credits
        getMovieCredits(item.id);
        // Fetch similar movies
        getSimilarMovies(item.id);
    }, [item]);

    // Function to fetch movie details
    const getMovieDetials = async id => {
        // Fetch movie details
        const data = await fetchMovieDetails(id);
        console.log('got movie details');
        // Set loading to false
        setLoading(false);
        // If data is returned, update the movie state
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }

    // Function to fetch movie credits
    const getMovieCredits = async id => {
        // Fetch movie credits
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        // If data is returned and it contains cast, update the cast state
        if (data && data.cast) {
            setCast(data.cast);
        }
    }

    // Function to fetch similar movies
    const getSimilarMovies = async id => {
        // Fetch similar movies
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        // If data is returned and it contains results, update the similarMovies state
        if (data && data.results) {
            setSimilarMovies(data.results);
        }
    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900">

            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/images/moviePoster2.png')} 
                                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }



            </View>

            {/* movie details */}

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    {
                        movie?.title
                    }
                </Text>

                {/* status, release year, runtime */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }



                {/* genres  */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* cast */}
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
            }

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }

        </ScrollView>
    )
}