import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : ' mt-3';
let movieName = "Avengers";


export default function MovieScreen() {
    // Use the route hook from react-navigation to get the parameters passed to this screen
    const { params: item } = useRoute();
    // State variable for favorite status, with initial value as false
    const [isFavorite, toggleFavorite] = useState(false);
    // State variable for cast members, with initial values as an array of numbers from 1 to 10
    const [cast, setCast] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // State variable for similar movies, with initial values as an array of numbers from 1 to 10
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // State variable for loading status, with initial value as false
    const [loading, setLoading] = useState(false);
    // Use the navigation hook from react-navigation
    const navigation = useNavigation();
    useEffect(() => {
        //    call the API
    }, [item])
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900 "
        >

            {/* back button and movie poster */}

            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth="2.8" color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                        <HeartIcon size="28" color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (<Loading />) : (<View>
                        <Image
                            source={require('../assets/images/moviePoster2.png')}
                            style={{ width: width, height: height * 0.55 }} />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8), rgba(23,23,23,1)']}
                            style={{ width: width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>)
                }

            </View>
            {/* Movie Deatils */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title  */}

                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movieName
                    }
                </Text>
                {/* status , release ,runtime */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Relased • 2020 • 170min
                </Text>

                {/* genres */}
                <View className="flex-row justify-center mx-4 space-x-2">

                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thriller •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text>
                </View>

                {/* description */}

                <Text className="text-neutral-400 mx-4 tracking-wide">
                    super heroes team up to save the world from a new & dangerous threat .
                    super heroes team up to save the world from a new & dangerous threat .
                    super heroes team up to save the world from a new & dangerous threat .
                    super heroes team up to save the world from a new & dangerous threat .
                    super heroes team up to save the world from a new & dangerous threat .
                    super heroes team up to save the world from a new & dangerous threat .
                </Text>

                {/* cast */}

                <Cast navigation={navigation} cast={cast} />

                {/* similar movies */}

                <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />


            </View>
        </ScrollView>
    )
}