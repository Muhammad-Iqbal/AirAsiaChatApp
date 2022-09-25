import React, {useContext, useLayoutEffect} from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  createGroupChannelListFragment,
  GroupChannelListContexts,
  GroupChannelListModule,
} from '@sendbird/uikit-react-native';
import {Icon} from '@sendbird/uikit-react-native-foundation';

const UseReactNavigationHeader: GroupChannelListModule['Header'] = () => {
  const navigation = useNavigation();
  const typeSelector = useContext(GroupChannelListContexts.TypeSelector);

  useLayoutEffect(() => {
    // Show react-navigation header.
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Connected Users',
      headerRight: () => (
        <Pressable onPress={typeSelector.show}>
          <Icon icon={'create'} />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon icon={'arrow-left'} />
        </Pressable>
      ),
    });
  }, [navigation, typeSelector.show]);

  // Hide @sendbird/uikit-react-native header.
  return null;
};

const CustomGroupChanelListFrament = createGroupChannelListFragment({
  Header: UseReactNavigationHeader,
});

export const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <CustomGroupChanelListFrament
      onPressCreateChannel={channelType => {
        // Navigate to GroupChannelCreate function.
        navigation.navigate('GroupChannelCreate', {channelType});
      }}
      onPressChannel={channel => {
        // Navigate to GroupChannel function.
        navigation.navigate('GroupChannel', {
          serializedChannel: channel.serialize(),
        });
      }}
    />
  );
};

export default GroupChannelListScreen;
