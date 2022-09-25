import React from 'react';
import {Alert, FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useConnection} from '@sendbird/uikit-react-native';
import {
  Button,
  Text,
  useUIKitTheme,
} from '@sendbird/uikit-react-native-foundation';
import {useSendbirdChat} from '@sendbird/uikit-react-native';
import {useNavigation} from '@react-navigation/native';

//custom components
import HomeListItem from '../../components/HomeListItem';

//custom styles + helpers
import styles from './styles';
import {useAppAuth} from '../../helpers/authentication';

const HomeItems: {
  title: string;
  desc?: string;
  image?: string;
  route?: string;
}[] = [
  {
    image: '',
    title: 'Connected Users',
    desc: '1 on 1, Group chat with members',
    route: 'GroupChannelList',
  },
];

const HomeScreen = () => {
  const {top, bottom, left, right} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {signOut} = useAppAuth();
  const {disconnect} = useConnection();
  const {select} = useUIKitTheme();
  const {currentUser} = useSendbirdChat();
  console.log(currentUser);
  return (
    <>
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
          return (
            <HomeListItem
              image={item.image}
              title={item.title}
              desc={item.desc || ''}
              onPress={() => {
                navigation.navigate(item?.route);
              }}
            />
          );
        }}
        ListHeaderComponent={
          <>
            <Text style={styles.screenTitle}>
              {'Welcome ' + currentUser?.nickname + '!'}
            </Text>
          </>
        }
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
    </>
  );
};

export default HomeScreen;
