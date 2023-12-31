import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles } from '../theme'

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : ' mt-3';

export default function MovieScreen() {
    const { params: item } = useRoute()
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
                    <TouchableOpacity>
                        <HeartIcon size="28" color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

        </ScrollView>
    )
}