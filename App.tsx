import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './src/redux/store'

import Home from './src/components/Home/Home'
import SelectLanguage from './src/components/Home/SelectLanguage'

const HomeStack = createStackNavigator()

const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}

export default App
