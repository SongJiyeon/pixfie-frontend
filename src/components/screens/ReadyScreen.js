import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';

import { setPhoto } from '../../actions/index';

function ReadyScreen ({ photoUrl, setPhoto, navigation }) {

  const fetchImage = () => {
    console.log(photoUrl);
    const photo = {
      uri: photoUrl,
      name: 'new-photo.jpg',
      type: 'multipart/form-data',
    };

    const data = new FormData();
    data.append('photo', photo);

    axios({
      method: 'POST',
      url: `http://192.168.0.136:3000/api/photo`,
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log("upload success", response.data);
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
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
      <View style={styles.main}>
      {photoUrl &&
        <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200 }} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchImage}>
        <Text>픽셀 프로필 만들기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text>사진 다시 찍기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text>사진 다시 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    photoUrl: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
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
