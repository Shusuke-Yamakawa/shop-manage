import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAT2AKstqEa9X7zMd3mO9tp5a7OoaBtxcg',
  authDomain: 'shopping-manage.firebaseapp.com',
  projectId: 'shopping-manage',
  storageBucket: 'shopping-manage.appspot.com',
  messagingSenderId: '160389690993',
  appId: '1:160389690993:web:d426cb3b93760b84378dd0',
  measurementId: 'G-EBR1KVCT2X',
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(firebaseApp);
