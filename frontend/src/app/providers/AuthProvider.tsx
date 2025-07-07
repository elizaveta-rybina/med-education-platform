import { AuthContext } from '@/context/AuthContext'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginType, setRememberedEmail } from '../store/auth/authSlice'
import { login, logout } from '../store/auth/authThunks'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token, rememberedEmail } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const { email, token } = JSON.parse(storedUser);
        dispatch({
          type: login.fulfilled.type,
          payload: { email, token },
          meta: { arg: { email, password: '' }, requestId: '', requestStatus: 'fulfilled' }
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, [dispatch]);

  const handleLogin = async (data: LoginType) => {
    try {
      const result = await dispatch(login(data) as any).unwrap();
      if (result) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout() as any).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSetRememberedEmail = (email: string) => {
    dispatch(setRememberedEmail(email));
    localStorage.setItem('rememberedEmail', email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        rememberedEmail,
        login: handleLogin,
        logout: handleLogout,
        setRememberedEmail: handleSetRememberedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;