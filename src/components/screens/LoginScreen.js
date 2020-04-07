import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import axios from 'axios';

import { setLoginInfo, setLoggedIn } from '../../actions/index';

function LoginScreen ({ loginInfo, handleChange, handleSubmit, navigation }) {

  const logIn = () => {
    axios({
      method: 'post',
      url: 'http://192.168.0.136:3000/api/auth/login',
      data: { ...loginInfo }
    })
    .then(response => {
      console.log("upload success", response.data);
      alert("반갑습니다");
      handleSubmit(true, response.data);
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
      <Button style={styles.button} title='로그인' onPress={logIn} />
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
    handleSubmit(status, user) {
      dispatch(setLoginInfo({ user_id: '', password: '' }));
      dispatch(setLoggedIn({ status, user }));
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
    width: 250
  }
});
