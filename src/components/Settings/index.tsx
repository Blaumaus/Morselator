import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setTheme } from '../../redux/actions/themeActions'
import { getThemeParam } from '../../themes'
import Hr from '../common/Hr'

const getStyles = theme => 
    StyleSheet.create({
        container: { 
            flex: 1,
            backgroundColor: getThemeParam('backgroundColor', theme)
        },
        text: {
            fontSize: 18,
            paddingLeft: 20,
            paddingVertical: 10,
            color: getThemeParam('actionTextColor', theme)
        },
    })

const ThemeSwitch = ({ style, theme, setTheme }) => (
    <TouchableOpacity onPress={() => setTheme(theme === 'white' ? 'dark' : 'white')}>
        <Text style={style}>Current theme: {theme}</Text>
        <Hr />
    </TouchableOpacity>
)

const Settings = ({ theme, setTheme }) => {
    const styles = getStyles(theme)

    return (
        <View style={styles.container}>
            <ThemeSwitch theme={theme} setTheme={setTheme} style={styles.text} />
        </View>
    )
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps, { setTheme })(Settings)