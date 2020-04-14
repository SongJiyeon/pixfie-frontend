import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';

import { setPhoto, setFaceLandmarks } from '../../actions/index';
import { IP_ADDRESS } from '../../constants/config';

function ReadyScreen ({ loggedIn, photoUrl, setPhoto, setFaceLandmarks, navigation }) {

  const fetchImage = async () => {
    console.log('Ready photo: ' + photoUrl);
    const photo = {
      uri: photoUrl,
      name: 'new-photo.jpg',
      type: 'multipart/form-data',
    };

    const data = new FormData();
    data.append('photo', photo);

    axios.post(`${IP_ADDRESS}/api/users/${loggedIn.user._id}/photos`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setFaceLandmarks(response.data);
      navigation.navigate('Result');
    })
    .catch(error => {
      console.log('error', error);
    });
  };

  const openCamera = async () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
      {photoUrl &&
        <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200 }} />}
      </View>
      <TouchableOpacity style={styles.buttonReady} onPress={fetchImage}>
        <Text style={styles.buttonText}>픽셀 프로필 만들기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCamera} onPress={openCamera}>
        <Text style={styles.buttonText}>사진 다시 찍기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGallery} onPress={pickImage}>
        <Text style={styles.buttonText}>사진 다시 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    photoUrl: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); },
    setFaceLandmarks: result => { dispatch(setFaceLandmarks(result)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    marginBottom: 20
  },
  buttonReady: {
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
  buttonCamera: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F2C53D',
    elevation: 1
  },
  buttonGallery: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#14A647',
    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    color: '#2c2c2c',
    fontSize: 70,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    fontFamily: 'slkscr',
    textAlign: 'center'
  },
});
