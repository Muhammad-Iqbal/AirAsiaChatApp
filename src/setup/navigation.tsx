import React, {useEffect} from 'react';
import {useSendbirdChat} from '@sendbird/uikit-react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Notifee from '@notifee/react-native';

//custom screens
import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/Chat';
import GroupChannelSettingsScreen from '../screens/Settings';
import ConnectedUsersScreen from '../screens/ConnectedUsersScreen';
import CreateChatScreen from '../screens/CreateChat';

//helpers
import {onForegroundAndroid, onForegroundIOS} from '../helpers/notification';

//static container
const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const {currentUser} = useSendbirdChat();

  useEffect(() => {
    Notifee.setBadgeCount(0);
    const unsubscribes = [onForegroundAndroid(), onForegroundIOS()];
    return () => {
      unsubscribes.forEach(fn => fn());
    };
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!currentUser ? (
          <RootStack.Screen name={'SignIn'} component={SignInScreen} />
        ) : (
          <>
            <RootStack.Screen name={'Home'} component={HomeScreen} />
            <RootStack.Screen
              name={'GroupChannelList'}
              component={ConnectedUsersScreen}
            />
            <RootStack.Screen
              name={'GroupChannelCreate'}
              component={CreateChatScreen}
            />
            <RootStack.Screen
              name={'GroupChannelSettings'}
              component={GroupChannelSettingsScreen}
            />
            <RootStack.Screen name={'GroupChannel'} component={ChatScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
