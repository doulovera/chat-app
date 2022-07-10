import { initializeApp, getApps } from 'firebase/app';
import { GithubAuthProvider, getAuth, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { UserInfo } from '@typests/user';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '1026475934756',
  appId: '1:229023413701:web:ea9075b7e105918075c7ac',
};

!getApps().length && initializeApp(firebaseConfig);

const auth = getAuth();

const mapUserFromAuth = (user: any) => {
  const { email, photoURL, displayName, providerData } = user;
  const { uid } = providerData[0];

  return {
    email,
    photoURL,
    displayName,
    uid,
    token: `github_${uid}`, // TODO: make this variable depending on the provider
  };
};

export const logOut = async () => {
  await signOut(auth);
  return null;
};

export const onAuthChanged = (onChange: (user: UserInfo | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const logInGithub = () => {
  const provider = new GithubAuthProvider();
  provider.addScope('read:user');
  return signInWithPopup(auth, provider);
};
