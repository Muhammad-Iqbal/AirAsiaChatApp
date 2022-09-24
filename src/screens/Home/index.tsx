import React from 'react';
import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useConnection} from '@sendbird/uikit-react-native';
import {
  Button,
  Text,
  useUIKitTheme,
} from '@sendbird/uikit-react-native-foundation';

import {useNavigation} from '@react-navigation/native';

import HomeListItem from '../../components/HomeListItem';
import {useAppAuth} from '../../helpers/authentication';

const HomeItems: {title: string; desc?: string; image?: any; route?: Routes}[] =
  [
    {
      image: '',
      title: 'Connected Members List',
      desc: '1 on 1, Group chat with members',
      route: 'GroupChannelList',
    },
    {
      image: '',
      title: 'Open channel',
      desc: 'Live streams, Open community chat',
      route: undefined,
    },
  ];

const HomeScreen = () => {
  const {top, bottom, left, right} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {signOut} = useAppAuth();
  const {disconnect} = useConnection();
  const {select, colors} = useUIKitTheme();

  return (
    <FlatList
      style={{
        backgroundColor: select({light: '#F0F0F0', dark: '#0F0F0F'}),
        marginTop: top,
      }}
      contentContainerStyle={{
        paddingTop: 32,
        paddingBottom: 32 + bottom,
        paddingLeft: 24 + left,
        paddingRight: 24 + right,
      }}
      data={HomeItems}
      keyExtractor={k => k.title}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => {
        if (item.image) {
          return (
            <HomeListItem
              image={item.image}
              title={item.title}
              desc={item.desc || ''}
              onPress={() => {
                if (!item.route)
                  return Alert.alert('Sorry', 'Not implemented yet');
                navigation.navigate(item.route);
              }}
            />
          );
        }

        return (
          <Pressable
            onPress={() => {
              if (!item.route)
                return Alert.alert('Sorry', 'Not implemented yet');
              navigation.navigate(item.route);
            }}
            style={[
              styles.customSampleButton,
              {
                backgroundColor: select({
                  light: colors.background,
                  dark: colors.onBackground04,
                }),
              },
            ]}>
            <Text h2>{item.title}</Text>
          </Pressable>
        );
      }}
      ListHeaderComponent={<Text style={styles.screenTitle}>{'Home'}</Text>}
      ListFooterComponent={
        <View style={styles.footer}>
          <View style={styles.divider} />
          <Button
            variant={'contained'}
            style={styles.btn}
            onPress={async () => {
              await signOut();
              await disconnect();
            }}>
            {'Sign out'}
          </Button>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'red',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    height: 16,
  },
  divider: {
    marginVertical: 32,
    height: 1,
    backgroundColor: 'rgba(122,122,122,0.2)',
  },
  customSampleButton: {
    paddingHorizontal: 24,
    paddingVertical: 22,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 4,
    borderRadius: 8,
  },
  footer: {
    marginTop: 16,
  },
  btn: {
    width: '100%',
    paddingVertical: 16,
  },
});

export default HomeScreen;
