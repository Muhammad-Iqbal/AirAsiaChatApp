import React from 'react';
import {View, Text} from 'react-native';
import {
  SendbirdUIKitContainer,
  useSendbirdChat,
  useConnection,
} from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import {
  GroupChannelListScreen,
  GroupChannelCreateScreen,
  GroupChannelScreen,
} from '../screens/index';
import {
  FileService,
  NotificationService,
  ClipboardService,
} from '../helpers/sendBirdHelpers';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const {currentUser} = useSendbirdChat();

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
              component={GroupChannelListScreen}
            />
            <RootStack.Screen
              name={'GroupChannelCreate'}
              component={GroupChannelCreateScreen}
            />
            <RootStack.Screen
              name={'GroupChannel'}
              component={GroupChannelScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const ChatAppParent = () => {
  return (
    <SendbirdUIKitContainer
      appId={'D6CE2DFE-FDA2-48E5-97F9-FFB71EF75033'}
      chatOptions={{localCacheStorage: AsyncStorage}}
      platformServices={{
        file: FileService,
        notification: NotificationService,
        clipboard: ClipboardService,
      }}>
      <Navigation />
    </SendbirdUIKitContainer>
  );
};

export default ChatAppParent;
