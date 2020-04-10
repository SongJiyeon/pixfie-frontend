import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { setPhoto } from '../../actions/index';

import Header from '../layouts/Header';

function HomeScreen ({ loggedIn, setPhoto, navigation }) {
  const [fontsLoaded] = useFonts({
    'slkscr': require('../../../android/app/src/main/assets/fonts/slkscr.ttf'),
  });

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const openCamera = async () => {

    if (!loggedIn.status) {
      alert('로그인이 필요한 서비스입니다');
      return navigation.navigate('Login');
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
      navigation.navigate('Ready');
    }
  };
  
  const pickImage = async () => {

    if (!loggedIn.status) {
      alert('로그인이 필요한 서비스입니다');
      return navigation.navigate('Login');
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
  
    if (!result.cancelled) {
      setPhoto(result.uri);
      navigation.navigate('Ready');
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.title}>pixfie</Text>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>사진 찍기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>사진 가져오기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.buttonText}>사진 편집</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    photo: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#2c2c2c',
    fontSize: 70,
    marginTop: '45%',
    marginBottom: 30,
    fontWeight: '300',
    fontFamily: 'slkscr',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'gray'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
