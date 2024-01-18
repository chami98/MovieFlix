import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function PersonScreen() {
    // Use the route hook from react-navigation to get the parameters passed to this screen
    const { params: item } = useRoute();
    // State variable for favorite status, with initial value as false
    const [isFavourite, toggleFavourite] = useState(false);
    // Use the navigation hook from react-navigation
    const navigation = useNavigation();
    // State variable for the person details, with initial value as an empty object
    const [person, setPerson] = useState({});
    // State variable for the person's movies, with initial values as an empty array
    const [personMovies, setPersonMovies] = useState([]);
    // State variable for loading status, with initial value as false
    const [loading, setLoading] = useState(false);

    // Use effect hook to fetch person details and their movies when the component mounts
    useEffect(() => {
        // Set loading to true
        setLoading(true);
        // Fetch person details
        getPersonDetails(item.id);
        // Fetch person's movies
        getPersonMovies(item.id);
    }, [item]);

    // Function to fetch person details
    const getPersonDetails = async id => {
        // Fetch person details
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        // Set loading to false
        setLoading(false);
        // If data is returned, update the person state
        if (data) {
            setPerson(data);
        }
    }

    // Function to fetch person's movies
    const getPersonMovies = async id => {
        // Fetch person's movies
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        // If data is returned and it contains cast, update the personMovies state
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }
    }

    return (
        <ScrollView
            className="flex-1 bg-neutral-900"
            contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button */}
            <SafeAreaView
                className={"flex-row justify-between items-center mx-4 z-10 " + verticalMargin}>
                <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View
                            className="flex-row justify-center"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1,
                            }}
                        >
                            <View
                                className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                                <Image
                                    // source={require('../assets/images/castImage2.png')} 
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {/* Keanu Reeves */}
                                {person?.name}
                            </Text>
                            <Text className="text-neutral-500 text-base text-center">
                                {person?.place_of_birth}
                                {/* Beirut, Lebanon */}
                            </Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold ">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {/* Male */}
                                    {
                                        person?.gender == 1 ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {/* 1964-09-02 */}
                                    {person?.birthday}
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">known for</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {/* Acting */}
                                    {person?.known_for_department}
                                </Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {/* 84.23 % */}
                                    {person?.popularity?.toFixed(2)} %
                                </Text>
                            </View>

                        </View>
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {
                                    person?.biography ? person.biography : 'N/A'
                                }
                            </Text>
                        </View>

                        {/* person movies */}
                        {person?.id && personMovies.length > 0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} />}

                    </View>
                )
            }



        </ScrollView>

    )
}