import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  createGroupChannelFragment,
  useSendbirdChat,
} from '@sendbird/uikit-react-native';

const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelScreen = () => {
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

export default GroupChannelScreen;
