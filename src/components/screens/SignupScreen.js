import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

import { setSignupInfo } from '../../actions/index';
import { IP_ADDRESS, ACCESS_TOKEN } from '../../constants/config';

function SignupScreen ({ signupInfo, handleChange, handleSubmit, navigation }) {
  const regexPassword = /^[A-Za-z0-9]{6,15}$/;

  const signUp = () => {
    axios({
      method: 'post',
      url: `${IP_ADDRESS}/api/auth/signup`,
      data: { ...signupInfo }
    })
    .then(response => {
      console.log("upload success", response.data);
      alert("회원가입을 축하합니다");
      handleSubmit();
      navigation.navigate('Login');
    })
    .catch(error => {
      if (error.response.status === 409) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert("Upload failed!");
      }
    });
  };

  const areAllInputsFilled = signupInfo.user_id.length * signupInfo.user_name.length * signupInfo.password.length * signupInfo.passwordCheck.length;
  const isPasswordSame = signupInfo.password === signupInfo.passwordCheck;

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
        {!!signupInfo.password.length && !regexPassword.test(signupInfo.password) && <Text style={styles.alertMessage}>비밀번호가 올바른 형식이 아닙니다</Text>}

        <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="비밀번호 확인"
        editable={!!signupInfo.password.length}
        onChangeText={value => handleChange('passwordCheck', value)}
        value={signupInfo.passwordCheck} />
        {!!signupInfo.passwordCheck.length && !isPasswordSame && <Text style={styles.alertMessage}>비밀번호가 다릅니다</Text>}

      </View>

      <TouchableOpacity
      style={(areAllInputsFilled && isPasswordSame) ? styles.button : styles.disabledButton}
      onPress={signUp}
      disabled={!(areAllInputsFilled && isPasswordSame)}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
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
  alertMessage: {
    color: 'red'
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
  disabledButton: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
