import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Animated, StatusBar } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'

import Header from '../Header'
import Selector from './Selector'
import Keyboard from './Keyboard'

import Hr from '../common/Hr'
import { copyToClipboard, checkCamera, displayMorse, displayMessage } from '../common/utils'
import { Lang } from './interfaces'
import translate from './translate'
import Icon from '../common/Icon'
import { getThemeParam } from '../../themes'

import clipboard from '../../assets/icons/clipboard.png'
import zap from '../../assets/icons/zap.png'
import zap_off from '../../assets/icons/zap_off.png'
import volume_on from '../../assets/icons/volume_2.png'
import volume_off from '../../assets/icons/volume_x.png'

const getStyles = theme => 
    StyleSheet.create({
        textinput: {
            paddingHorizontal: 20,
            minHeight: 131,
            maxHeight: 198,
            textAlignVertical: 'top',
            fontSize: 18,
            color: getThemeParam('descTextColor', theme),
            backgroundColor: getThemeParam('backgroundColor', theme)
        },
        translationContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            backgroundColor: getThemeParam('backgroundColor', theme)
        },
        translation: {
            fontSize: 24,
            paddingRight: 30,
            color: getThemeParam('descTextColor', theme),
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingHorizontal: 10,
            width: '40%'
        },
        buttonsContainer: {
            paddingTop: 10,
            backgroundColor: getThemeParam('backgroundColor', theme)
        },
        icon: {
            width: 25,
            height: 25,
            tintColor: getThemeParam('actionTextColor', theme)
        },
        placeholder: {
            height: '100%',
            backgroundColor: getThemeParam('backgroundColor', theme)
        }
    })

interface HomeProps {
    navigation: NavigationScreenProp<any, any>
    route: { params: any } | undefined
    theme: 'white' | 'dark'
}

const Home: React.FC<HomeProps> = ({ navigation, route, theme }) => {
    const styles = getStyles(theme)
    const [lang, setLang] = useState<Lang>(route?.params?.lang || { from: 'en', into: 'morse'})
    const [input, setInput] = useState('')
    const [translation, setTranslation] = useState('')
    const [height, setHeight] = useState(131) // TODO: Refactor
    const [torch, setTorch] = useState(false)

    const transHeight = useRef(new Animated.Value(0)).current // needed for animations

    useEffect(() => {
        if (input.length === 0) Animated.timing(transHeight, { toValue: 0, useNativeDriver: false }).start()
        else if (input.length === 1) Animated.spring(transHeight, { toValue: 50, useNativeDriver: false }).start()

        setTranslation(translate(input.trim(), lang.from, lang.into))
    }, [lang, input])

    useEffect(() => {
        torch && displayMorse(lang.into === 'morse' ? translation : input, setTorch)
    }, [torch])
    
    const torchHandler = async () => {
        if (await checkCamera()) setTorch(!torch) 
        else displayMessage('Morselator needs camera permission in order to use this feature')
    }
    return (
        <View>
            <StatusBar 
                barStyle={`${theme === 'white' ? 'dark' : 'white'}-content`} 
                backgroundColor={getThemeParam('headerBackgroundColor', theme)} />
            <Header />
            <Selector
                lang={lang}
                setLang={setLang}
                setInput={setInput}
                navigation={navigation} />
            <Hr />

            <TextInput
                value={input}
                onChangeText={t => setInput(t)}
                placeholder={lang.from === 'morse'
                    ? "Use the morse keyboard to enter text"
                    : "Tap to enter text"}
                placeholderTextColor={getThemeParam('textInputPlaceholder', theme)}
                keyboardAppearance={theme === 'white' ? 'light' : 'dark'}
                multiline={true}
                editable={lang.into === 'morse'}
                onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
                style={[styles.textinput, { height }]}
                testID="textToTranslateInput"
                />

            <Hr />

            <Animated.ScrollView horizontal={true} style={[styles.translationContainer, { minHeight: transHeight }]}>
                <Text style={styles.translation} testID="translation">
                    {translation}
                </Text>
            </Animated.ScrollView>

            <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
                    <Icon
                        style={styles.icon}
                        onPress={() => {
                            copyToClipboard(translation)
                            displayMessage('Copied to clipboard', true)
                        }}
                        src={clipboard}
                        disabled={!translation} />
                    <Icon
                        style={styles.icon}
                        onPress={() => torchHandler()}
                        src={torch ? zap_off : zap}
                        disabled={!translation} />
                    <Icon style={styles.icon} onPress={() => displayMessage('This feature is not available yet')} src={volume_on} disabled={!translation} />
                </View>
            </View>

            {/* TODO: Refactor */}
            <View style={styles.placeholder}></View>

            {lang.from === 'morse' && <Keyboard setInput={setInput} />}
        </View>
    )
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(Home)