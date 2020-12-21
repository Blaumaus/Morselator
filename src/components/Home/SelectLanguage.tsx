import React, { Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Hr from '../common/Hr'
import { NavigationScreenProp } from 'react-navigation'
import { getCurrentCode, fromMorse } from '../common/utils'

const Item = ({ name, onPress, style, ...rest }) => (
    <TouchableOpacity onPress={onPress} {...rest}>
        <Text style={style}>{name}</Text>
    </TouchableOpacity>
)

interface SelectLanguageProps {
    navigation: any
    route: { params: any }
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ navigation, route }) => {
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
                        style={[styles.text, styles.blue]}
                        enabled={code !== getCurrentCode(lang)}
                        />
                    <Hr />
                </Fragment>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    text: {
        fontSize: 18,
        paddingLeft: 20,
        paddingVertical: 10
    },
    blue: { color: '#043087' }
})

export default SelectLanguage