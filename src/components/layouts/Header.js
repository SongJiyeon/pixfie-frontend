import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header ({name, navigation}) {
  return (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <Ionicons name="ios-search" size={32} color="black" style={{marginRight: 10}} />
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  header:{
    width:"100%",
    marginTop: 20,
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
  }
});
