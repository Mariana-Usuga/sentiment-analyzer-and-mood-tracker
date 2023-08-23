import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, registerNewUser, userExists } from '../fireabse';

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}: any) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        console.log(user);
        const isRegistered = await userExists(user.uid);
        console.log('isRegistered ', isRegistered);
        if (isRegistered) {
          onUserLoggedIn(user);
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: '',
            email: user.email
          })
          onUserNotRegistered();
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotLoggedIn]);

  return <div>{children}</div>;
}
