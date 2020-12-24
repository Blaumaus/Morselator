import React, { Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Hr from '../common/Hr'
import { connect } from 'react-redux'
import { getCurrentCode, fromMorse } from '../common/utils'
import { getThemeParam } from '../../themes'

type ItemProps = {
    name: string
    style: object | object[]
    onPress: () => void
    disabled: boolean
}

const Item: React.FC<ItemProps> = ({ name, onPress, style, disabled }) => (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={style}>{name}</Text>
    </TouchableOpacity>
)

type SelectLanguageProps = {
    navigation: any
    route: { params: any }
    theme: string
}

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
        }
    })

const SelectLanguage: React.FC<SelectLanguageProps> = ({ navigation, route, theme }) => {
    const styles = getStyles(theme)
    const { data, lang } = route.params
    
    return (
        <View style={styles.container}>
            {data.map(({ name, code }) =>
                <Fragment key={code}>
                    <Item
                        name={name}
                        onPress={() => {
                            navigation.push('Home', {
                                lang: {
                                    from: fromMorse(lang) ? 'morse' : code,
                                    into: fromMorse(lang) ? code : 'morse'
                                }
                            })
                        }}
                        style={code === getCurrentCode(lang) ? [styles.text, { color: 'gray' }] : [styles.text]}
                        disabled={code === getCurrentCode(lang)}
                        />
                    <Hr />
                </Fragment>
            )}
        </View>
    )
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(SelectLanguage)