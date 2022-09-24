import React, {useState, useContext, useLayoutEffect} from 'react';
import {Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  createGroupChannelListFragment,
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  useSendbirdChat,
  createGroupChannelSettingsFragment,
  GroupChannelListContexts,
  GroupChannelListModule,
} from '@sendbird/uikit-react-native';
import {Icon} from '@sendbird/uikit-react-native-foundation';

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelSettingsFragment = createGroupChannelSettingsFragment();

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
  }, []);

  // Hide @sendbird/uikit-react-native header.
  return null;
};

const CustomGroupChanelListFrament = createGroupChannelListFragment({
  Header: UseReactNavigationHeader,
});

export const GroupChannelSettingsScreen = () => {
  const {sdk} = useSendbirdChat();
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();
  const [channel] = useState(() =>
    sdk.GroupChannel.buildFromSerializedData(params.serializedChannel),
  );

  return (
    <GroupChannelSettingsFragment
      channel={channel}
      onPressHeaderLeft={() => {
        // Navigate back
        navigation.goBack();
      }}
      onPressMenuMembers={() => {
        // Navigate to group channel members
        navigation.navigate(Routes.GroupChannelMembers, params);
      }}
      onPressMenuLeaveChannel={() => {
        // Navigate to group channel list
        navigation.navigate(Routes.GroupChannelList);
      }}
    />
  );
};

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

export const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async channel => {
        // Navigate to GroupChannel function.
        navigation.replace('GroupChannel', {
          serializedChannel: channel.serialize(),
        });
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
    />
  );
};

export const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const {sdk} = useSendbirdChat();
  const channel = sdk.GroupChannel.buildFromSerializedData(
    params.serializedChannel,
  );

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        // Navigate to GroupChannelList function.
        navigation.navigate('GroupChannelList');
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
      onPressHeaderRight={() => {
        // Navigate to GroupChannelSettings function.
        navigation.navigate('GroupChannelSettings', {
          serializedChannel: params.serializedChannel,
        });
      }}
    />
  );
};
