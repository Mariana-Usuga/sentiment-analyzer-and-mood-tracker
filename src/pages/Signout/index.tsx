import { AnyMxRecord } from 'dns';
import { auth } from '../../fireabse';

const Signout = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      console.log('Sesión cerrada correctamente.');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  return <button onClick={signOut}>Signout</button>;
}

export default Signout;