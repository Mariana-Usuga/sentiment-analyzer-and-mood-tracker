import { auth } from '../../firebase';
import { CustomError } from '../../models/customError';

const Signout = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      console.log('Sesión cerrada correctamente.');
    } catch (error) {
      const customError: CustomError = error as CustomError;
      console.error('Error al cerrar sesión:', customError.message);
    }
  };
  return <button onClick={signOut}>Signout</button>;
};

export default Signout;
