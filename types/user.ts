export type UserInfo = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  token: string;
  username?: string;
};

export type UserStates = 'idle' | 'loading' | 'error' | 'success';
