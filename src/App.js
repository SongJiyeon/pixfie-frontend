import * as React from 'react';
import { Platform, StyleSheet, Text, Button, View } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function App() {
  let [fontsLoaded] = useFonts({
    'slkscr': require('../android/app/src/main/assets/fonts/slkscr.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>pixfie</Text>
        <Button style={styles.instructions} title="Take Photo" />
        <Button style={styles.instructions} title="Get Photo" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 70,
    textAlign: 'center',
    fontFamily: 'slkscr',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
