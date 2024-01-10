// Import necessary components from react-navigation
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Import the screens
import HomeScreen from "../screens/HomeScreen"
import MovieScreen from "../screens/MovieScreen"
import PersonScreen from "../screens/PersonScreen"
import SearchScreen from "../screens/SearchScreen"

// Create a stack navigator
const stack = createNativeStackNavigator()

// Define the app navigation
export default function AppNavigation() {
    return (
        // Navigation container
        <NavigationContainer>
            {/* Stack navigator */}
            <stack.Navigator>
                {/* Home screen */}
                <stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                {/* Movie screen */}
                <stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
                {/* Person screen */}
                <stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
                {/* Search screen */}
                <stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
            </stack.Navigator>
        </NavigationContainer>
    )
}