import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Canvas from 'react-native-canvas';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import _ from 'lodash';
import axios from 'axios';

import Header from '../layouts/Header';
import { IP_ADDRESS } from '../../constants/config';
import { handleCanvas } from '../../utils/index';
import { setSearchedUser, setUserPortraits } from '../../actions';
import { Ionicons } from '@expo/vector-icons';

function DoubleTapButton({ onDoubleTap, children }) {
  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onDoubleTap && onDoubleTap();
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onHandlerStateChange}
      numberOfTaps={2}>
      {children}
    </TapGestureHandler>
  );
}

function UserpageScreen ({ loggedIn, searchedUser, setSearchedUser,  userPortraits, setUserPortraits, navigation }) {
  const user = searchedUser;
  const isFollowing = user.followers.includes(loggedIn.user._id);
  
  useEffect(() => {
    const photos = navigation.addListener('focus', () => {
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
    return photos;
  }, [navigation]);

  const renderPhotos = item => {
    const isLiked = item.like_users.includes(loggedIn.user._id);
    return (
      <View style={styles.photoContainer}>
        <View style={styles.photoHeader}>
          <Ionicons
          name={isLiked ? "md-heart" : "md-heart-empty"}
          size={32}
          color={isLiked ? "tomato" : "gray"} />
          <Text style={styles.photoTitle}>{item.like_users.length} likes</Text>
        </View>
        <DoubleTapButton onDoubleTap={() => handleDoubletap(item)}>
          <Canvas style={styles.canvas} ref={handleCanvas}  />
        </DoubleTapButton>
      </View>
    );
  };

  const handleDoubletap = item => {
    item.like_users.includes(loggedIn.user._id) ?
    axios({
      method: 'put',
      url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/unlike/${item._id}`,
      data: { owner_id: user._id }
    })
    .then(response => {
      setUserPortraits(response.data.photos);
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    })
    : axios({
      method: 'put',
      url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/like/${item._id}`,
      data: { owner_id: user._id }
    })
    .then(response => {
      setUserPortraits(response.data.photos);
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
  };

  const handleFollow = () => {
    isFollowing ?
    axios({
      method: 'put',
      url: `${IP_ADDRESS}/api/users/unfollow`,
      data: { user_id: loggedIn.user._id, followee_id: user._id }
    })
    .then(response => {
      const newFollowers = user.followers;
      _.remove(newFollowers, id => id === loggedIn.user._id);
      setSearchedUser({ ...user, followers: newFollowers });
      console.log(response.data);
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    })
    : axios({
      method: 'put',
      url: `${IP_ADDRESS}/api/users/follow`,
      data: { user_id: loggedIn.user._id, followee_id: user._id }
    })
    .then(response => {
      const newFollowers = user.followers;
      newFollowers.push(loggedIn.user._id);
      setSearchedUser({ ...user, followers: newFollowers });
      console.log(response.data);
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
  };
  
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.userContainer}>
        <Image style={styles.profileImage} source={{ uri: user.profile_url }} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userId}>{user.user_id}</Text>
          <Text style={styles.userName}>{user.user_name}</Text>
        </View>
        <View style={styles.followContainer}>
          <View style={styles.followCounts}>
            <View style={styles.followBox}>
              <Text style={styles.follow}>{user.followers.length}</Text>
              <Text style={styles.followTitle}>팔로워</Text>
            </View>
            <View style={styles.followBox}>
              <Text style={styles.follow}>{user.followings.length}</Text>
              <Text style={styles.followTitle}>팔로잉</Text>
            </View>
          </View>
          <TouchableOpacity style={isFollowing ? styles.unfollowButton : styles.followButton} onPress={handleFollow}>
            <Text style={styles.followButtonTitle}>{isFollowing ? "언팔로우" : "팔로우"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userPortraits.length !== 0 &&
      <>
        <FlatList
          data={userPortraits}
          renderItem={({ item, index }) => renderPhotos(item, index)}
          keyExtractor={item => item._id} />
      </>
      }
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    searchedUser: state.searchedUser,
    userPortraits: state.userPortraits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchedUser: user => { dispatch(setSearchedUser(user)); },
    setUserPortraits: portraits => { dispatch(setUserPortraits(portraits)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserpageScreen);

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
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    marginLeft: '4%',
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
    marginTop: 10
  },
  followCounts: {
    flexDirection: 'row',
    marginBottom: 5
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
  followButton: {
    width: 105,
    height: 25,
    justifyContent: 'center',
    backgroundColor: '#4968A6'
  },
  unfollowButton: {
    width: 105,
    height: 25,
    justifyContent: 'center',
    backgroundColor: '#D9843B'
  },
  followButtonTitle: {
    textAlign: 'center',
    color: 'white'
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoHeader: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10
  },
  photoTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  },
  photo: {
    marginBottom: 20,
    width: 300,
    height: 300
  },
});
