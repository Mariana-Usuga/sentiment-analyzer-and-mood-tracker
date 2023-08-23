import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { auth, registerNewUser, userExists } from '../../fireabse';
import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GoogleIcon from '@mui/icons-material/Google';

const useStyles = makeStyles((theme: any) => ({
  googleButton: {
    transition: 'background-color .3s, box-shadow .3s',
    padding: '12px 16px 12px 42px',
    border: 'none',
    borderRadius: '3px',
    color: '#757575',
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    fontSize: '14px',
    fontWeight: '500',
    '&:hover': {
      boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)',
    },
  },
}));

export default function LoginView() {
  const classes = useStyles();
  let navigate = useNavigate();
  const [state, setCurrentState] = useState(1);
  //const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        navigate('/moodState');
        console.log('USER ', user);
      } else {
        console.log('usuario no existe');
      }
    });
  }, []);

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, googleProvider);

      if (res) {
        console.log('si existe ', res.user);
        const userDb = userExists(res.user.uid);
        const idToken = await res.user.getIdToken();
        console.log('Token JWT:', idToken);
        localStorage.setItem('token', idToken);
        if (!userDb) {
          registerNewUser({
            uid: res.user.uid,
            displayName: res.user.displayName,
            profilePicture: '',
            email: res.user.email,
          });
        }
      } else {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const idToken = await userCredential.user.getIdToken();
        console.log('Token JWT registro:', idToken);
        localStorage.setItem('token', idToken);
        console.log('no');
      }
    } catch (err) {
      console.error(err);
      //alert(err.message);
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='h4' gutterBottom>
        Inicia sesion con Google
      </Typography>
      <Button onClick={handleOnClick} className={classes.googleButton}>
        <GoogleIcon />
        Google
      </Button>
    </Container>
  );
}

/*
 fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif',

backgroundColor: '#4285F4',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#357AE8',
    },*/
/*import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth, userExists } from '../fireabse';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AuthProvider from '../components/authProvider';

export default function LoginView() {
  let navigate = useNavigate();
  const [state, setCurrentState] = useState(1);
  /**
   * 0: inicializado
   * 1: loading
   * 2: login completo
   * 3: login pero sin registro
   * 4: no hay nadie logueado
   */
//const [currentUser, setCurrentUser] = useState(null);

/*const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    //await signInWithGoogle(googleProvider);

    const signInWithGoogle = async (googleProvider: any) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        if (res) {
          console.log(res.user);
        }
      } catch (err) {
        console.error(err);
        //alert(err.message);
      }
    };
  };
  const handleUserLoggedIn = () => {
    navigate('/')//dashboard
  };

  const handleUserNotRegistered = () => {
    navigate('/signout')//choose username 
  };

  const handleUserNotLoggedIn = () => {
    setCurrentState(4)
  };

  if (state === 4) {
    return <button onClick={handleOnClick}>FIREBASE CON google</button>;
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}*/
