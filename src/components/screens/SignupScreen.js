import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import axios from 'axios';

import { setSignupInfo } from '../../actions/index';

function SignupScreen ({ signupInfo, handleChange, handleSubmit, navigation }) {
  const signUp = () => {
    axios({
      method: 'post',
      url: 'http://192.168.0.136:3000/api/auth/signup',
      data: { ...signupInfo }
    })
    .then(response => {
      console.log("upload success", response.data);
      alert("회원가입을 축하합니다");
      handleSubmit();
      navigation.navigate('Login');
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <View>
        <TextInput
        style={styles.inputText}
        placeholder="아이디"
        onChangeText={value => handleChange('user_id', value)}
        value={signupInfo.user_id} />
        <TextInput
        style={styles.inputText}
        placeholder="이름"
        onChangeText={value => handleChange('user_name', value)}
        value={signupInfo.user_name} />
        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호(영문 숫자 6~15자 이내)"
        onChangeText={value => handleChange('password', value)}
        value={signupInfo.password} />
        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호 확인"
        onChangeText={value => handleChange('passwordCheck', value)}
        value={signupInfo.passwordCheck} />
      </View>
      <Button style={styles.button} title='Sign Up' onPress={signUp} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    signupInfo: state.signupInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(info, value) {
      dispatch(setSignupInfo({ [info]: value }));
    },
    handleSubmit() {
      dispatch(setSignupInfo({ user_id: '', user_name: '', password: '', passwordCheck: '' }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

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
