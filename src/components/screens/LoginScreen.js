import React from 'react';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

import { setLoginInfo, setLoggedIn, setUserPortraits } from '../../actions/index';
import { IP_ADDRESS, ACCESS_TOKEN } from '../../constants/config';

export function LoginScreen ({ loginInfo, handleChange, handleSubmit, navigation }) {

  const logIn = () => {
    axios({
      method: 'post',
      url: `${IP_ADDRESS}/api/auth/login`,
      data: { ...loginInfo }
    })
    .then(response => {
      const { user, token, photos } = response.data;
      
      alert("반갑습니다");

      SecureStore.setItemAsync(ACCESS_TOKEN, token);
      handleSubmit(true, user, photos);

      navigation.navigate('Home');
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View>
        <TextInput
        style={styles.inputText}
        placeholder="아이디"
        onChangeText={value => handleChange('user_id', value)}
        value={loginInfo.user_id} />
        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호"
        onChangeText={value => handleChange('password', value)}
        value={loginInfo.password} />
      </View>
      <TouchableOpacity style={styles.button} onPress={logIn}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loginInfo: state.loginInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(info, value) {
      dispatch(setLoginInfo({ [info]: value }));
    },
    handleSubmit(status, user, photos) {
      dispatch(setLoginInfo({ user_id: '', password: '' }));
      dispatch(setLoggedIn({ status, user }));
      dispatch(setUserPortraits(photos));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    width: 300,
    height: 45,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 20,
    borderColor: 'transparent',
    backgroundColor: 'white'
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
