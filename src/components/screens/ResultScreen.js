import React from 'react';
import { connect } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import axios from 'axios';

import Header from '../layouts/Header';
import { handleCanvas } from '../../utils/index';
import { faceColors } from '../../constants/canvas';
import { setFaceType, setOptionTheme, setCurrentOption } from '../../actions/index';
import { IP_ADDRESS } from '../../constants/config';

function ResultScreen ({ loggedIn, faceType, setFaceType, optionTheme, setOptionTheme, option, setCurrentOption, navigation }) {

  const carouselHandler = direction => {
    let newOption = 0;
    if (direction === 'left') {
      newOption = !option ? optionTheme.options.length - 1 : option - 1;
    } else {
      newOption = option === optionTheme.options.length - 1 ? 0 : option + 1;
    }
    setCurrentOption(newOption);

    setFaceType(optionTheme.id === 'faceColor' ?
    {
      ...faceType,
      [optionTheme.id]: optionTheme.options[newOption][0],
      faceShadowColor: optionTheme.options[newOption][1],
    }
    : { ...faceType, [optionTheme.id]: optionTheme.options[newOption] });
  };

  const savePortrait = () => {
    axios({
      method: 'post',
      url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/portraits`,
      data: { faceType }
    })
    .then(() => {
      alert('저장 성공!');
      navigation.navigate('Home');
    })
    .catch(error => {
      alert("failed!");
    });
  };
  
  return (
    <View style={styles.container}>
      <Header name="Edit" navigation={navigation} />
      <View style={styles.optionControlContainer}>
        <TouchableOpacity onPress={() => carouselHandler('left')}>
          <Entypo name="arrow-bold-left" size={20} color="gray" />
        </TouchableOpacity>
        <Text>{optionTheme.options[option][0]}</Text>
        <TouchableOpacity onPress={() => carouselHandler('right')}>
          <Entypo name="arrow-bold-right" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <Canvas style={styles.canvas} ref={canvas => handleCanvas(canvas, faceType)} /> 
      </View>
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
    portraitUrl: state.portraitUrl,
    faceType: state.faceType,
    optionTheme: state.optionTheme,
    option: state.currentOption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFaceType: faceType => { dispatch(setFaceType(faceType)); },
    setOptionTheme: theme => { dispatch(setOptionTheme(theme)) },
    setCurrentOption: option => { dispatch(setCurrentOption(option)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionControlContainer: {
    flexDirection: 'row'
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
