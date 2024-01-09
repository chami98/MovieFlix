import React, { Component, useEffect, useState } from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTrendingMovies } from '../api/moviedb'
const ios = Platform.OS === 'ios'

export default function HomeScreen() {
    // State variable for trending movies, with initial values as an array of numbers from 1 to 3
    const [trending, setTrending] = useState([1, 2, 3])
    // State variable for upcoming movies, with initial values as an array of numbers from 1 to 3
    const [upcoming, setUpcoming] = useState([1, 2, 3])
    // State variable for top rated movies, with initial values as an array of numbers from 1 to 3
    const [topRated, setTopRated] = useState([1, 2, 3])
    // State variable for loading status, with initial value as false
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log('Got trending movies', data);
    }
    return (
        <View className=" flex-1 bg-neutral-800 ">
            {/* search bar and logo  */}

            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4" >
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text
                        className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovie<Text style={styles.text}>F</Text>lix
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {/* Trending Movies Carousel */}

                        <TrendingMovies data={trending} />

                        {/* Upcoming movies */}

                        <MovieList title="Upcoming" data={upcoming} />

                        {/* top rated movies */}

                        <MovieList title="Top Rated" data={topRated} />

                    </ScrollView>)

            }
        </View>
    )
}
