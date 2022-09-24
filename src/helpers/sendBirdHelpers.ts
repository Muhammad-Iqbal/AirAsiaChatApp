import Clipboard from '@react-native-clipboard/clipboard';
import CameraRoll from '@react-native-community/cameraroll';
import RNFBMessaging from '@react-native-firebase/messaging';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import axios from 'axios';

import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeNotificationService,
} from '@sendbird/uikit-react-native';

export const APP_ID = 'D6CE2DFE-FDA2-48E5-97F9-FFB71EF75033';

export const ClipboardService = createNativeClipboardService(Clipboard);
export const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});
export const FileService = createNativeFileService({
  fsModule: FileAccess,
  permissionModule: Permissions,
  imagePickerModule: ImagePicker,
  mediaLibraryModule: CameraRoll,
  documentPickerModule: DocumentPicker,
});
const createSendbirdFetcher = (appId: string, apiToken: string) => {
  const client = axios.create({
    baseURL: `https://api-${appId}.sendbird.com/v3`,
    headers: {'Api-Token': apiToken},
  });
  client.interceptors.response.use(res => res.data);
  return client;
};

const createSendbirdAPI = (appId: string, apiToken: string) => {
  const fetcher = createSendbirdFetcher(appId, apiToken);
  const MIN = 60 * 1000;
  return {
    getSessionToken(
      userId: string,
      expires_at = Date.now() + 10 * MIN,
    ): Promise<{user_id: string; token: string; expires_at: number}> {
      return fetcher.post(`/users/${userId}/token`, {expires_at});
    },
  };
};

export const SendbirdAPI = createSendbirdAPI(APP_ID, 'API_TOKEN');
