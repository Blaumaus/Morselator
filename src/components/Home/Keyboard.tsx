import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Hr from '../common/Hr'

import { KeyboardProps } from './interfaces.ts'

interface Key {
    char: string,
    style: object,
    charStyle: object,
    onPress: (key: string) => void
}

const Key: React.FC<Key> = ({ char, style, charStyle, onPress }: Key) => (
    <TouchableOpacity onPress={() => onPress(char)} style={style}>
        <Text style={charStyle}>{char}</Text>
    </TouchableOpacity>
)

const Keyboard: React.FC<KeyboardProps> = ({ onChange, visible }: KeyboardProps) => {
    const keys = ['–', '•']

    return (
        <View style={[styles.container, !visible && { display: 'none' }]}>
            {keys.map(el => <Key
                char={el}
                key={el}
                style={styles.key}
                charStyle={styles.char}
                onPress={k => onChange(k)}
                />)}
            <Hr />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    key: {
        borderRadius: 4,
        backgroundColor: 'aliceblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginBottom: 6,
        minWidth: '40%',
        height: 80,
    },
    char: {
        fontSize: 65,
        color: '#043087'
    }
})

export default Keyboard