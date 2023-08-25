import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, registerNewUser, userExists } from '../../firebase';
import { Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { CustomError } from '../../models/customError';
import CustomButton from '../../components/CustomButton';

const LoginView: React.FC = () => {
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        navigate('/moodState');
      }
    });
  }, []);

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, googleProvider);

      if (res) {
        const userDb = await userExists(res.user.uid);
        const idToken = await res.user.getIdToken();
        localStorage.setItem('token', idToken);
        if (!userDb) {
          registerNewUser({
            uid: res.user.uid,
            displayName: res.user.displayName ?? '',
            moods: [],
          });
        }
      } else {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
      }
    } catch (error) {
      const customError: CustomError = error as CustomError;
      console.error('Error al cerrar sesión:', customError.message);
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
      <CustomButton onClick={handleOnClick}>
        <GoogleIcon />
        Google
      </CustomButton>
    </Container>
  );
};

export default LoginView;
/**     
 * <ButtonGoogle onClick={handleOnClick}>
        <GoogleIcon />
        Google
      </ButtonGoogle>
 */
