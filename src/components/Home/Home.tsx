import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, Animated } from 'react-native'

import Header from '../Header'
import Selector from './Selector'
import Keyboard from './Keyboard'

import Hr from '../common/Hr'
import { copyToClipboard, checkCamera, displayMorse } from '../common/utils'
import { Lang } from './interfaces.ts'
import translate from './translate'
import Icon from '../common/Icon'

import clipboard from '../../assets/icons/clipboard.png'
import zap from '../../assets/icons/zap.png'
import zap_off from '../../assets/icons/zap_off.png'
import volume_on from '../../assets/icons/volume_2.png'
import volume_off from '../../assets/icons/volume_x.png'

const Home = ({ navigation, route }) => {
    const [lang, setLang] = useState<Lang>(route.params?.lang || { from: 'en', into: 'morse'})
    const [input, setInput] = useState('')
    const [translation, setTranslation] = useState('')
    const [height, setHeight] = useState(131) // TODO: Refactor
    const [torch, setTorch] = useState(false)

    const transHeight = useRef(new Animated.Value(0)).current // needed for animations

    useEffect(() => {
        if (input.length === 0) Animated.spring(transHeight, { toValue: 0, duration: 300, useNativeDriver: false }).start()
        else if (input.length === 1) Animated.spring(transHeight, { toValue: 50, duration: 300, useNativeDriver: false }).start()

        setTranslation(translate(input.trim(), lang.from, lang.into))
    }, [lang, input])

    useEffect(() => {
        torch && displayMorse(lang.into === 'morse' ? translation : input, () => torch, setTorch)
    }, [torch])

    const torchHandler = async () => {
        if (checkCamera()) setTorch(!torch)
    }

    return (
        <View>
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
                multiline={true}
                editable={lang.into === 'morse'}
                onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
                style={[styles.textinput, { height }]}
                />

            <Hr />

            <Animated.ScrollView horizontal={true} style={[styles.translationContainer, { minHeight: transHeight }]}>
                <Text style={styles.translation}>
                    {translation}
                </Text>
            </Animated.ScrollView>

            <View style={styles.buttons}>
                <Icon
                    style={styles.icon}
                    onPress={() => copyToClipboard(translation)}
                    src={clipboard}
                    disabled={!translation} />
                <Icon
                    style={styles.icon}
                    onPress={() => torchHandler()}
                    src={torch ? zap_off : zap}
                    disabled={!translation} />
                <Icon style={styles.icon} onPress={() => {}} src={volume_on} disabled={!translation} />
            </View>

            {lang.from === 'morse' && <Keyboard setInput={setInput} />}
        </View>
    )
}

const styles = StyleSheet.create({
    textinput: {
        paddingHorizontal: 20,
        minHeight: 131,
        maxHeight: 198,
        textAlignVertical: 'top',
        fontSize: 18,
        color: 'black'
    },
    translationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10
    },
    translation: {
        fontSize: 24,
        paddingRight: 30,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '40%',
    },
    icon: {
        width: 25,
        height: 25
    }
})

export default Home