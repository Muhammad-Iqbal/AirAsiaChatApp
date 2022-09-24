import React, {useCallback} from 'react';
import {useConnection, useSendbirdChat} from '@sendbird/uikit-react-native';

import SignInComponent from '../../components/Signin';

import {useAppAuth} from '../../helpers/authentication';
import {SendbirdAPI} from '../../helpers/sendBirdHelpers';

const Login = () => {
  const {sdk} = useSendbirdChat();
  const {connect} = useConnection();

  const {loading, signIn} = useAppAuth(user => connectWith(user.userId));

  const connectWith = useCallback(
    async (userId: string, nickname?: string, useSessionToken = false) => {
      if (useSessionToken) {
        const sessionHandler = new sdk.SessionHandler();
        sessionHandler.onSessionTokenRequired = (onSuccess, onFail) => {
          SendbirdAPI.getSessionToken(userId)
            .then(({token}) => onSuccess(token))
            .catch(onFail);
        };
        sdk.setSessionHandler(sessionHandler);

        const data = await SendbirdAPI.getSessionToken(userId);
        await connect(userId, {nickname, accessToken: data.token});
      } else {
        await connect(userId, {nickname});
      }
    },
    [connect, sdk],
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      const userId = data?.userId;
      const nickname = data?.nickname;
      await signIn({userId});
      await connectWith(userId, nickname);
    },
    [signIn, connectWith],
  );

  return (
    <>
      <SignInComponent onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default Login;
