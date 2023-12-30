import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={600}
                itemWidth={400}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}

const MovieCard = ({ item }) => {
    return (
        <TouchableWithoutFeedback>
            <Text className="text-white">Movie</Text>
        </TouchableWithoutFeedback>
    )
} 