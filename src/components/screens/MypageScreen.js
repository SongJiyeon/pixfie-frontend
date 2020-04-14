import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo'
import Canvas from 'react-native-canvas';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

import Header from '../layouts/Header';
import DropDown from '../layouts/Dropdown';
import { handleCanvas } from '../../utils/index';
import { IP_ADDRESS } from '../../constants/config';
import { setLoggedIn, setUserPortraits, setDropdownStatus } from '../../actions';

function MypageScreen ({ loggedIn, userPortraits, setUserPortraits, setDropdownStatus, navigation }) {
  const user = loggedIn.user;

  useEffect(() => {
    const getPhotos = navigation.addListener('focus', () => {
      axios({
        method: 'get',
        url: `${IP_ADDRESS}/api/users/${user._id}/photos`
      })
      .then(response => {
        console.log('success');
        setUserPortraits(response.data.photos);
      })
      .catch(error => {
        console.log("error", error);
        alert("failed!");
      });
    });
    return getPhotos;
  }, [navigation]);

  const showDropdown = item => {
    setDropdownStatus({ status: true, position: {}, item });
  };

  const hideDropdown = (mode, item) => {
    setDropdownStatus({ status: false, position: {}, item: {} });
    switch(mode) {
      case 'Edit':
        return navigation.navigate('Edit');
      case 'Delete':
        return axios({
          method: 'delete',
          url: `${IP_ADDRESS}/api/users/${user._id}/portraits`,
          data: { portrait_id: item._id }
        })
        .then(response => {
          console.log('success');
          setUserPortraits(response.data.photos);
        })
        .catch(error => {
          console.log("error", error);
          alert("failed!");
        });
    };
  };

  const renderPhotos = item => {
    return (
      <View style={styles.photoContainer}>
        <View style={styles.photoHeader}>
          <Text style={styles.photoTitle}>{item.like_users.length} likes</Text>
          <TouchableOpacity style={styles.photoMenuButton} ref={item.ref} onPress={() => showDropdown(item)}>
            <Entypo name="dots-three-vertical" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Canvas style={styles.canvas} ref={handleCanvas}  />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header name={user.user_id} navigation={navigation} />
      <View style={styles.userContainer}>
        <Image style={styles.profileImage} source={{ uri: user.profile_url }} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userId}>{user.user_id}</Text>
          <Text style={styles.userName}>{user.user_name}</Text>
        </View>
        <View style={styles.followContainer}>
          <View style={styles.followBox}>
            <Text style={styles.follow}>{user.followers.length}</Text>
            <Text style={styles.followTitle}>팔로워</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.follow}>{user.followings.length}</Text>
            <Text style={styles.followTitle}>팔로잉</Text>
          </View>
        </View>
      </View>
      {userPortraits.length !== 0 &&
      <>
        <FlatList
          data={userPortraits}
          renderItem={({ item, index }) => renderPhotos(item, index)}
          keyExtractor={item => item._id} />
        <DropDown hide={hideDropdown} navigation={navigation} />
      </>
      }
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    dropdownStatus: state.dropdownStatus,
    userPortraits: state.userPortraits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: user => { dispatch(setLoggedIn(true, user)); },
    setUserPortraits: portraits => { dispatch(setUserPortraits(portraits)); },
    setDropdownStatus: status => { dispatch(setDropdownStatus(status)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    marginLeft: '2%',
    marginRight: '3%',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderColor: 'white',
    borderWidth: 3
  },
  canvas: {
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
  userInfoContainer: {
    width: '45%'
  },
  userId: {
    fontSize: 30
  },
  followContainer: {
    flexDirection: 'row',
  },
  followBox: {
    justifyContent: 'center',
    width: 50,
    marginRight: 5
  },
  follow: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  followTitle: {
    textAlign: 'center'
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoHeader: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10
  },
  photoTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  },
  photoMenuButton: {
    position: 'absolute',
    paddingTop: 10,
    right: 10,
  },
  photo: {
    marginBottom: 20,
    width: 300,
    height: 300
  },
});
