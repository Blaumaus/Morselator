import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'

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

const Home = () => {
    const [lang, setLang] = useState<Lang>({ from: 'en', into: 'morse'})
    const [input, setInput] = useState('')
    const [translation, setTranslation] = useState('')
    const [height, setHeight] = useState(131) // TODO: Refactor
    const [torch, setTorch] = useState(false)

    useEffect(() => {
        setTranslation(translate(input.trim(), lang.from, lang.into))
    }, [lang, input])

    useEffect(() => {
        torch && displayMorse(lang.into === 'morse' ? translation : input, () => torch, setTorch)
    }, [torch])

    const inputHandler = t => {
        setInput(t)
    }

    const torchHandler = async () => {
        if (checkCamera()) setTorch(!torch)
    }

    const keyPress = (key: string): void => {

    }

    return (
        <View style={styles.container}>
            <Header />
            <Selector lang={lang} setLang={setLang} setInput={setInput} />
            <Hr />
            <TextInput
                value={input}
                onChangeText={t => inputHandler(t)}
                placeholder="Tap to enter text"
                multiline={true}
                onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
                style={[styles.textinput, { height }]}
                />
            <Hr />

            <ScrollView horizontal={true} style={styles.translationContainer}>
                <Text style={styles.translation}>
                    {translation}
                </Text>
            </ScrollView>

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

            <View style={{  }}>
                <Keyboard onChange={keyPress} visible={lang.from === 'morse'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textinput: {
        paddingHorizontal: 20,
        minHeight: 131,
        maxHeight: 198,
        textAlignVertical: 'top',
        fontSize: 18
    },
    translationContainer: {
        flexDirection: 'row',
        minHeight: 60,
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
        padding: 10,
        width: '40%'
    },
    icon: {
        width: 25,
        height: 25
    }
})

export default Home