import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';

import Home from './src/components/Home/Home'

const App = () => {
  return (
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  }
})

export default App;
