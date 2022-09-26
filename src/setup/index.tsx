import React from 'react';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './navigation';

import {
  FileService,
  NotificationService,
  ClipboardService,
} from '../helpers/sendBirdHelpers';

import {APP_ID} from '../helpers/sendBirdHelpers';

const ChatAppParent = () => {
  return (
    <SendbirdUIKitContainer
      appId={APP_ID}
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
