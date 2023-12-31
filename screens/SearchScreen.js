import { View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Platform, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : ' mt-3';


export default function SearchScreen() {
    const [results, setResults] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [loading, setLoading] = useState(false);
    let movieName = "Avengers";
    const navigation = useNavigation();
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput

                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-1 flex-1 text-base font-semibold text-white tracking-wider" />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>

            {/* results */}

            {loading ? (<Loading />) : (
                results.length > 0 ? (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >

                        <Text className="text-white font-semibold ml-1">Results ({results.length}) </Text>
                        <View className="flex-row justify-between flex-wrap">
                            {
                                results.map((item, index) => (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.push('Movie', item)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image
                                                className="rounded-3xl"
                                                source={require('../assets/images/moviePoster2.png')}
                                                style={{ width: width * 0.44, height: height * 0.3 }}
                                            />
                                            <Text className="text-neutral-400 ml-1">
                                                {movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))
                            }

                        </View>

                    </ScrollView>

                ) : (
                    <View className="flex-row justify-center">
                        <Image
                            source={require('../assets/images/movieTime.png')}
                            className="h-96 w-96"
                        />

                    </View>))}

        </SafeAreaView>
    )
}