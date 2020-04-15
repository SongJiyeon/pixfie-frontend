import axios from 'axios';
import _ from 'lodash';

import { IP_ADDRESS } from '../constants/config';

export const savePortrait = (method, user_id, faceType, departure, navigation, portrait) => {
  axios({
    method,
    url: `${IP_ADDRESS}/api/users/${user_id}/portraits`,
    data: portrait ? { portrait_id: portrait._id, faceType } : { faceType }
  })
  .then(() => {
    alert('저장 성공!');
    navigation.navigate(departure);
  })
  .catch(error => {
    alert("저장에 실패했습니다");
  });
};

export const deletePortrait = (item, user, setUserPortraits) => {
  axios({
    method: 'delete',
    url: `${IP_ADDRESS}/api/users/${user._id}/portraits`,
    data: { portrait_id: item._id }
  })
  .then(response => {
    setUserPortraits(response.data.photos);
  })
  .catch(error => {
    alert("삭제를 실패했습니다");
  });
};

export const handleFollow = (loggedIn, user, setSearchedUser) => {
  const isFollowing = user.followers.includes(loggedIn.user._id);
  const uri = isFollowing ? 'unfollow' : 'follow';

  axios({
    method: 'put',
    url: `${IP_ADDRESS}/api/users/${uri}`,
    data: { user_id: loggedIn.user._id, followee_id: user._id }
  })
  .then(response => {
    const newFollowers = user.followers;

    isFollowing ?
    _.remove(newFollowers, id => id === loggedIn.user._id)
    : newFollowers.push(loggedIn.user._id);

    setSearchedUser({ ...user, followers: newFollowers });
  })
  .catch(error => {
    alert("Upload failed!");
    console.log(error);
  });
};

export const handleDoubletap = (item, loggedIn, user, setUserPortraits) => {
  const uri = item.like_users.includes(loggedIn.user._id) ? 'unlike' : 'like';
  console.log('hello');
  axios({
    method: 'put',
    url: `${IP_ADDRESS}/api/users/${loggedIn.user._id}/${uri}/${item._id}`,
    data: { owner_id: user._id }
  })
  .then(response => {
    setUserPortraits(response.data.photos);
  })
  .catch(error => {
    alert("Upload failed!");
  });
};
