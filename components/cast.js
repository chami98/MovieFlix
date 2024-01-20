import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185, image342 } from '../api/moviedb';
var { width, height } = Dimensions.get('window');

export default function Cast({ cast, navigation }) {
    return (
        <View className="my-6">
            {/* Title for the cast section */}
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            {/* Scrollable container for the cast members */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    // Map through the cast array and display each cast member
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                // Navigate to Person screen when pressed
                                onPress={() => navigation.navigate('Person', person)}
                                className="mr-4 items-center">
                                <View
                                    className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                    {/* Cast member image */}
                                    <Image
                                        className="rounded-2xl h-24 w-20"
                                        // source={require('../assets/images/castImage1.png')} 
                                        source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                                    />
                                </View>

                                {/* Cast member character name */}
                                <Text className="text-white text-xs mt-1">
                                    {
                                        // If the character name is longer than 10 characters, truncate it
                                        person?.character.length > 10 ? person.character.slice(0, 10) + '...' : person?.character
                                    }
                                </Text>
                                {/* Cast member original name */}
                                <Text className="text-neutral-400 text-xs">
                                    {
                                        // If the original name is longer than 10 characters, truncate it
                                        person?.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>

        </View>
    )
}