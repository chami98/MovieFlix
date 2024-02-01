// Import necessary components and libraries from React Native
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

// Get device width and height
var { width, height } = Dimensions.get('window');

// TrendingMovies component definition
export default function TrendingMovies({ data }) {
    // Hook into navigation
    const navigation = useNavigation();

    // Handle click event
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    // Render the component
    return (
        <View className="mb-8">
            {/* Title for trending movies */}
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>

            {/* Carousel component for trending movies */}
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

// MovieCard component definition
const MovieCard = ({ item, handleClick }) => {
    // Render movie card with TouchableWithoutFeedback
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            {/* Movie poster image */}
            <Image
                source={require('../assets/images/moviePoster1.png')}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-xl"
            />
        </TouchableWithoutFeedback>
    );
};
