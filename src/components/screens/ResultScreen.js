import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import axios from 'axios';

import Header from '../layouts/Header';
import { handleCanvas } from '../../utils/index';
import { setPortraitUrl } from '../../actions/index';
import { IP_ADDRESS } from '../../constants/config';

function ResultScreen ({ navigation, loggedIn }) {

  const faceType = {
    face: 1,
    eyebrows: 1,
    eyeshadow: 1,
    nose: 1,
    mouth: 1
  };

  const savePortrait = () => {
    axios({
      method: 'post',
      url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/portraits`,
      data: faceType
    })
    .then(response => {
      alert('저장 성공!');
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log("error", error);
      alert("failed!");
    });
    axios.post(`${IP_ADDRESS}/api/users/${loggedIn.user._id}/portraits`,
    data,
    )
    .then(response => {
      alert('저장 성공!');
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log('error', error);
    });
  };
  
  return (
    <View style={styles.container}>
      <Header name="Edit" navigation={navigation} />
      <ViewShot style={styles.viewShot} ref={viewRef} options={{ format: "jpg", quality: 0.9 }}>
        <Canvas style={styles.canvas} ref={handleCanvas} /> 
      </ViewShot>
      <TouchableOpacity style={styles.button} onPress={savePortrait}>
        <Text style={styles.buttonText}>픽셀 프로필 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')}}>
        <Text style={styles.buttonText}>다시하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    portraitUrl: state.portraitUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPortraitUrl: url => { dispatch(setPortraitUrl(url)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  canvas: {
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
  button: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#4968A6',
    elevation: 1
  },
});
