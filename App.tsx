import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/components/Home/Home'
import SelectLanguage from './src/components/Home/SelectLanguage'

const HomeStack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }} />
                <HomeStack.Screen
                    name="Home.SelectLanguage"
                    component={SelectLanguage}
                    options={{ headerTitle: 'Select language' }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    )
}

export default App
