import { FieldValue, serverTimestamp } from 'firebase/firestore';

export type UserType = {
  id?: string;
  name: string;
  pushToken?: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export const initialUser: UserType = {
  name: '',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
};
