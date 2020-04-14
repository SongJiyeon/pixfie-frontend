import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import Header from '../layouts/Header';
import { handleCanvas } from '../../utils/index';

function EditScreen ({ navigation }) {  
  return (
    <View style={styles.container}>
      <Header name="Edit" navigation={navigation} />
      <Canvas style={styles.canvas} ref={handleCanvas}/> 
    </View>
  );
};

const mapStateToProps = state => {
  return {
    user: state.loggedIn.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); }
  };
};

export default connect(mapStateToProps, null)(EditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  canvas: {
    borderColor: 'gray',
    borderWidth: 1
  }
});
