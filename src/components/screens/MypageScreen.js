import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';

import axios from 'axios';

import Header from '../layouts/Header';
import { IP_ADDRESS, ACCESS_TOKEN } from '../../constants/config';

const Photos = photos => {
  return (
    <View style={styles.photoContainer}>
      {photos.length && photos.map(photo => {
        <Image style={styles.photo} source={{ uri: photo.image_url }} />
      })}
    </View>
  );
};

function MypageScreen ({ user, navigation }) {

  useEffect(() => {
    axios({
      method: 'get',
      url: `${IP_ADDRESS}/api/users/${user._id}/photos`
    })
    .then(response => {
      console.log("success", response.data);
    })
    .catch(error => {
      console.log("error", error);
      alert("failed!");
    });
  }, []);

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
      <Photos photos={[]} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    user: state.loggedIn.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); }
  };
};

export default connect(mapStateToProps, null)(MypageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: 'red'
  },
  profileImage: {
    marginLeft: '2%',
    marginRight: '3%',
    width: 70,
    height: 70
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
  },
  photo: {
    width: 100,
    height: 100
  }
});
