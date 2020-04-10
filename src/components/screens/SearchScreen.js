import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

import { setSearchKeyword, setSearchResults } from '../../actions';
import { IP_ADDRESS, ACCESS_TOKEN } from '../../constants/config';
import Header from '../layouts/Header';

const Results = ({ users, navigation }) => {

  const handlePress = user => {
    navigation.navigate('Userpage', {
      user
    });
  };

  return (
    <View style={styles.resultContainer}>
      {users.length ?
      users.map((user, index) => {
        return (
          <TouchableOpacity style={styles.userContainer} onPress={() => handlePress(user)} key={index}>
            <Image style={styles.profileImage} source={{ uri: user.profile_url }} />
            <View>
              <Text style={styles.userId}>{user.user_id}</Text>
              <Text style={styles.userName}>{user.user_name}</Text>
            </View>
          </TouchableOpacity>
        );
      })
      :<Text style={styles.noResult}>검색 결과 없음</Text>}
    </View>
  );
};

const SearchScreen = props => {
  const { navigation, keyword, users, handleChange, setSearchResults, clearStates } = props;

  useEffect(() => {
    clearStates();
  }, []);

  const onChangeText = value => {
    handleChange(value);
    axios({
      method: 'get',
      url: `${IP_ADDRESS}/api/users/search`,
      params: { keyword: keyword }
    })
    .then(response => {
      setSearchResults(response.data);
    })
    .catch(error => {
      alert("Upload failed!");
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <TextInput
        style={styles.inputText}
        placeholder="아이디/이름 검색"
        onChangeText={value => onChangeText(value)}
        value={keyword} />
      <Results users={users} navigation={navigation} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    keyword: state.keyword,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(value) {
      dispatch(setSearchKeyword(value));
    },
    setSearchResults(result) {
      dispatch(setSearchResults(result));
    },
    clearStates() {
      dispatch(setSearchKeyword(''));
      dispatch(setSearchResults([]));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputText: {
    width: '100%',
    height: 45,
    marginBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 20,
    borderColor: 'transparent',
    backgroundColor: 'white'
  },
  button: {
    width: 250
  },
  resultContainer: {
    marginBottom: 30
  },
  userContainer: {
    marginTop: 10,
    paddingLeft: 10,
    width: 300,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  profileImage: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  userId: {
    fontSize: 25
  },
  userName: {
    fontSize: 15
  },
  noResult: {
    fontSize: 15,
    color: 'gray'
  }
});
