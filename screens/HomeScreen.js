import React, { Component } from 'react'
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
const ios = Platform.OS === 'ios'

export default class HomeScreen extends Component {
    render() {
        return (
            <View className="flex-1 bg-neutral-800 ">
                {/* search bar and logo  */}

                <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                    <StatusBar style="light" />
                    <View className="flex-row justify-between items-center mx-4" >
                        <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                        <Text
                            className="text-white text-3xl font-bold">
                            MovieFlix
                        </Text>
                        <TouchableOpacity>
                            <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}
