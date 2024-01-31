// Import necessary components and libraries from React Native
import { View, Text, Dimensions } from 'react-native'
import React from 'react'

// Import Progress components from react-native-progress library
import * as Progress from 'react-native-progress'

// Import theme object from theme file
import { theme } from '../theme'

// Get device dimensions
const { width, height } = Dimensions.get('window')

// Define the Loading component
export default function Loading() {
    return (
        // Render a View component to contain the loading indicator
        <View style={{ height, width }} className="absolute flex-row justify-center items-center">
            {/* Render a Progress CircleSnail component for loading */}
            <Progress.CircleSnail thickness={12} color={theme.background} size={160} />
        </View>
    )
}
