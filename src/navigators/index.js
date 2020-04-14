import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Text, View, Image, StyleSheet } from 'react-native';

import axios from 'axios';

import HomeScreen from '../components/screens/HomeScreen';
import ReadyScreen from '../components/screens/ReadyScreen';
import SearchScreen from '../components/screens/SearchScreen';
import LoginScreen from '../components/screens/LoginScreen';
import SignupScreen from '../components/screens/SignupScreen';
import MypageScreen from '../components/screens/MypageScreen';
import UserpageScreen from '../components/screens/UserpageScreen';
import EditScreen from '../components/screens/EditScreen';
import ResultScreen from '../components/screens/ResultScreen';

import { setLoggedIn } from '../actions/index';
import { IP_ADDRESS } from '../constants/config';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  return <IconWithBadge {...props} badgeCount={3} />;
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Search') {
            iconName = 'ios-search';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Mypage" component={MypageScreen} />
      <Stack.Screen name="Userpage" component={UserpageScreen} />
      <Stack.Screen name="Ready" component={ReadyScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

Home.navigationOptions = {
  headerShown: false,
};

const Tab = createBottomTabNavigator();

const MyDrawer = ({ loggedIn, handleSubmit }) => {

  const handleLogout = () => { handleSubmit(false, {}); };

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.userContainer}>
          <Image style={styles.profileImage} source={{ uri: loggedIn.user.profile_url }} />
          <Text style={styles.userId}>{loggedIn.user.user_id}</Text>
          <Text style={styles.userName}>{loggedIn.user.user_name}</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    );
  }

  return (
    <>
      {loggedIn.status ?
      (<Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="My Page" component={MypageScreen} />
      </Drawer.Navigator>)
      :
      (<Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
      </Drawer.Navigator>)}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(status, user) {
      dispatch(setLoggedIn({ status, user }));
    }
  };
};

const MyDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(MyDrawer);

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderColor: 'gray',
    borderWidth: 3,
    marginBottom: 20
  },
  userId: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  userName: {
    fontSize: 20
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawerContainer />
    </NavigationContainer>
  );
}
