import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, registerNewUser, userExists } from '../../firebase';
import { Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { CustomError } from '../../models/customError';
import CustomButton from '../../components/CustomButton';

const LoginView: React.FC = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /*onAuthStateChanged(auth, async user => {
      if (user) {
        console.log('entra en user ');
        navigate('/moodState');
        //window.location.reload();
      }
    });*/
  }, []);

  const handleOnClick = async () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, googleProvider);

      if (res) {
        const userDb = await userExists(res.user.uid);
        const idToken = await res.user.getIdToken();
        localStorage.setItem('token', idToken);
        navigate('/moodState');
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
        navigate('/moodState');
      }
    } catch (error) {
      const customError: CustomError = error as CustomError;
      console.error('Error al cerrar sesión:', customError.message);
    }
    setIsLoading(false);
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
      {isLoading ? (
        <Typography variant='h4' gutterBottom>
          Cargando....
        </Typography>
      ) : (
        <>
          <Typography variant='h4' gutterBottom>
            Inicia sesion con Google
          </Typography>
          <CustomButton onClick={handleOnClick}>
            <GoogleIcon />
            Google
          </CustomButton>
        </>
      )}
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
