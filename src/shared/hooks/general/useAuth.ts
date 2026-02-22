import { authorizeWithEmail, authorizeWithGoogle } from "@/shared/services/AccountService";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoginWithEmailLoading, setLoginWithEmailLoading] = useState(false);
  const [isLoginWithGoogleLoading, setLoginWithGoogleLoading] = useState(false);

  const loginWithEmail = async (email: string, password: string) => {
    setLoginWithEmailLoading(true);
    try {
      const user = await authorizeWithEmail(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoginWithEmailLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'popup',
    onSuccess: async ({ code }) => {
      setLoginWithGoogleLoading(true);
      try {
        const user = await authorizeWithGoogle(code);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } catch (error) {
        console.error(error);
      } finally {
        setLoginWithGoogleLoading(false);
      }
    },
    onError: (error) => console.error(error),
  });

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return { 
    loginWithEmail, 
    loginWithGoogle, 
    logout, 
    isLoginWithEmailLoading, 
    isLoginWithGoogleLoading 
  };
};