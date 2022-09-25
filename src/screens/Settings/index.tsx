import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useSendbirdChat,
  createGroupChannelSettingsFragment,
} from '@sendbird/uikit-react-native';

const GroupChannelSettingsFragment = createGroupChannelSettingsFragment();

const SettingsScreen = () => {
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
        navigation.navigate('GroupChannelMembers', params);
      }}
      onPressMenuLeaveChannel={() => {
        // Navigate to group channel list
        navigation.navigate('GroupChannelList');
      }}
    />
  );
};

export default SettingsScreen;
