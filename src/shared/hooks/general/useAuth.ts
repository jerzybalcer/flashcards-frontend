import { authorizeWithEmail, authorizeWithGoogle, createAccountWithEmail } from "@/shared/services/AccountService";
import { LocalStorage } from "@/shared/utils/localStorage";
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
      const tokenResponse = await authorizeWithEmail(email, password);
      LocalStorage.set('user', tokenResponse.user)
      LocalStorage.set('accessToken', tokenResponse.accessToken)
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
        const tokenResponse = await authorizeWithGoogle(code);
        LocalStorage.set('user', tokenResponse.user)
        LocalStorage.set('accessToken', tokenResponse.accessToken)
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
    LocalStorage.clear('user');
    LocalStorage.clear('accessToken');
    navigate('/auth');
  };

  const createAccount = async (email: string, password: string) => {
    setLoginWithEmailLoading(true);
    try {
      await createAccountWithEmail(email, password);
      navigate('/verify');
    } catch (error) {
      console.error(error);
    } finally {
      setLoginWithEmailLoading(false);
    }
  };

  return { 
    loginWithEmail, 
    loginWithGoogle, 
    createAccount,
    logout, 
    isLoginWithEmailLoading, 
    isLoginWithGoogleLoading 
  };
};