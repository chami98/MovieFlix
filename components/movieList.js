import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
    let movieName = "Avengers";
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {!hideSeeAll && (<Text style={styles.text} className="text-lg">See All</Text>)}
            </View>

            {/* movie row  */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        source={require('../assets/images/moviePoster2.png')}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />

                                    <Text className="text-neutral-300 ml-1">{movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}