import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { User } from '../models/user';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(uid: any) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
}

export async function existsUsername(username: string) {
  const users: any = [];
  const q = query(collection(db, 'users'), where('username', '==', username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function getUserInfo(uid: User['uid']) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function registerNewUser(user: User) {
  try {
    if (user.uid && user.displayName) {
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, user.uid), user);
    } else {
      console.error(
        'Campos obligatorios (uid y displayName) no están definidos.',
      );
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function updateUser(user: User) {
  try {
    if (user.uid && user.displayName) {
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, user.uid), user);
    } else {
      console.error(
        'Campos obligatorios (uid y displayName) no están definidos.',
      );
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
