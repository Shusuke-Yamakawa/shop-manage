import { createContext } from 'react';
import { UserType } from '../types/user';

type UserContextValue = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});
