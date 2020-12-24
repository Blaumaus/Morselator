import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { connect } from 'react-redux'
import { getThemeParam } from './src/themes'

import Home from './src/components/Home/Home'
import SelectLanguage from './src/components/Home/SelectLanguage'
import Settings from './src/components/Settings'

const Stack = createStackNavigator()

const StackNavigator = ({ theme }) => (
    <Stack.Navigator screenOptions={{ 
        animationEnabled: false,
        headerStyle: { backgroundColor: getThemeParam('headerBackgroundColor', theme) },
        headerTitleStyle: { color: getThemeParam('descTextColor', theme) },
        headerTintColor: getThemeParam('descTextColor', theme)
        }}>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />
        
        <Stack.Screen
            name="Home.SelectLanguage"
            component={SelectLanguage}
            options={{ headerTitle: 'Select language' }} />

        <Stack.Screen 
            name="Settings"
            component={Settings}
            options={{ headerTitle: 'Settings' }} />
    </Stack.Navigator>
)

const ConnectedNavigator = connect(state => ({ theme: state.theme.theme }))(StackNavigator)

export default () => (
    <Provider store={store}>
        <NavigationContainer>
            <ConnectedNavigator />
        </NavigationContainer>
    </Provider>
)
