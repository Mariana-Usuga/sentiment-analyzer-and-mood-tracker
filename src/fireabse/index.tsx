// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
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

// Initialize Firebase
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
    console.log(doc.id, ' => ', doc.data());
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function getUserInfo(uid: any) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function registerNewUser(user: any) {
  try {
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function updateUser(user: any) {
  try {
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
