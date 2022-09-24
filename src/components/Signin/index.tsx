import React, {useState} from 'react';
import {View} from 'react-native';

import {Button, Text, TextInput} from '@sendbird/uikit-react-native-foundation';

// asset and style
import styles from './styles';
import colors from '../../constants/colorConstants';

import {_SignInProps} from '../../constants/interfaces';

const Signin = (props: _SignInProps) => {
  //props handling
  const {onSubmit, loading} = props;

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  if (loading) return null;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{'Air Asia Chat App'}</Text>
        <TextInput
          placeholder={'User ID'}
          value={userId}
          onChangeText={setUserId}
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackgroundColor,
              marginBottom: 12,
            },
          ]}
        />

        <TextInput
          placeholder={'Nickname'}
          value={nickname}
          onChangeText={setNickname}
          style={[styles.input, {backgroundColor: colors.inputBackgroundColor}]}
        />

        <Button
          style={styles.btn}
          variant={'contained'}
          onPress={() => {
            if (userId) {
              onSubmit({userId, nickname});
            }
          }}>
          {'Sign in'}
        </Button>
      </View>
    </>
  );
};

export default Signin;
