import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import Header from '../layouts/Header';
import { setFaceType, setOptionTheme, setCurrentOption } from '../../actions/index';
import { handleCanvas, carouselHandler } from '../../utils/index';
import { savePortrait } from '../../utils/api';

export function EditScreen ({ loggedIn, faceType, setFaceType, optionTheme, option, setCurrentOption, route, navigation }) {
  const { portrait } = route.params;

  useEffect(() => {
    const setEditFace = navigation.addListener('focus', () => {
      setFaceType(portrait.faceType);
    });
    return setEditFace;
  }, [navigation]);

  const pressHandler = direction => {
    const newOption = carouselHandler(direction, optionTheme, option);
    setCurrentOption(newOption);

    setFaceType(optionTheme.id === 'faceColor' ?
    {
      ...faceType,
      [optionTheme.id]: optionTheme.options[newOption][0],
      faceShadowColor: optionTheme.options[newOption][1],
      lipColor: optionTheme.options[newOption][1],
    }
    : { ...faceType, [optionTheme.id]: optionTheme.options[newOption] });
  };

  return (
    <View style={styles.container}>
      <Header name="Edit" navigation={navigation} />
      <View style={styles.optionControlContainer}>
        <TouchableOpacity onPress={() => pressHandler('left')}>
          <Entypo name="arrow-bold-left" size={20} color="gray" />
        </TouchableOpacity>
        <Text>{optionTheme.options[option][0]}</Text>
        <TouchableOpacity onPress={() => pressHandler('right')}>
          <Entypo name="arrow-bold-right" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <Canvas style={styles.canvas} ref={canvas => handleCanvas(canvas, faceType)} /> 
      </View>
      <TouchableOpacity style={styles.button} onPress={() => savePortrait('put', loggedIn.user._id, faceType, 'Mypage', navigation, portrait)}>
        <Text style={styles.buttonText}>픽셀 프로필 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack() }>
        <Text style={styles.buttonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);

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
