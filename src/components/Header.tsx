import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { displayMessage } from './common/utils'
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

const Header = ({ setTheme, theme }) => {
    let styles = getStyles(theme)

    const settingsHandler = (): void => {
        displayMessage('This feature is not available yet')
    }

    const changeThemeHandler = (): void => {
        setTheme(theme === 'white' ? 'dark' : 'white') // inverting theme
    }

    return (
        <View style={styles.header}>
            <Icon style={styles.icon} onPress={changeThemeHandler} src={theme === 'white' ? moon : sun} />
            <Text style={styles.name}>Morselator</Text>
            <Icon style={styles.icon} onPress={settingsHandler} src={settings_icon} />
        </View>
    )
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps, { setTheme })(Header)