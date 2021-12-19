import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
// import { signin, updateUser } from "../lib/firebase";
import { signIn } from '../lib/firebase';
// import { registerForPushNotificationsAsync } from "../lib/notification";
import { UserContext } from '../contexts/userContext';

export const AuthScreen: React.FC = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      // TODO FCMトークンをusersコレクションに持たせることを検討
      const user = await signIn();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: '#888',
  },
});
