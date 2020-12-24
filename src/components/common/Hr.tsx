import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    hr: {
        backgroundColor: '#A2A2A2',
        height: .4,
        alignSelf: 'stretch'
    }
})

export default () => <View style={styles.hr}></View>