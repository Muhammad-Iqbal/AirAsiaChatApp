import React from 'react';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './navigation';

import {
  FileService,
  NotificationService,
  ClipboardService,
} from '../helpers/sendBirdHelpers';

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
