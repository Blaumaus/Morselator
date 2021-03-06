import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setTheme } from '../redux/actions/themeActions'
import { getThemeParam } from '../themes'

import Icon from './common/Icon'
import settings_icon from '../assets/icons/settings_dark.png'
import sun from '../assets/icons/sun.png'
import moon from '../assets/icons/moon.png'

const getStyles = theme => 
    StyleSheet.create({
        header: {
            backgroundColor: getThemeParam('headerBackgroundColor', theme),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: .3,
            elevation: 1,
            position: 'relative',
            paddingHorizontal: 20
        },
        name: { 
            fontSize: 21, 
            color: getThemeParam('descTextColor', theme)
        },
        icon: {
            width: 25,
            height: 25,
            tintColor: getThemeParam('actionTextColor', theme)
        }
    })

const Header = ({ setTheme, theme, navigation }) => {
    let styles = getStyles(theme)

    const settingsHandler = (): void => {
        navigation.navigate('Settings')
    }

    const changeThemeHandler = (): void => {
        setTheme(theme === 'white' ? 'dark' : 'white') // inverting theme
    }

    return (
        <View style={styles.header} testID="header">
            <Icon style={styles.icon} onPress={changeThemeHandler} src={theme === 'white' ? moon : sun} testID="header:theme_button" />
            <Text style={styles.name} testID="header:app_name">Morselator</Text>
            <Icon style={styles.icon} onPress={settingsHandler} src={settings_icon} />
        </View>
    )
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps, { setTheme })(Header)