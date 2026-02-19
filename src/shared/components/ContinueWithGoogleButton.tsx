import { Button } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function LoginButton() {
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
        console.log(code);
    },
    onError: (err) => console.error('Login failed:', err),
    flow: 'auth-code',  // ważne! używamy authorization code flow
    ux_mode: 'popup',  // opcjonalnie, można też użyć 'redirect'
  });

  return (
        <Button 
            w='100%' py={6} mt={2} 
            fontSize='lg' 
            borderRadius='xl' 
            colorScheme='whiteAlpha'
            onClick={() => login()} 
            isLoading={false}
            isDisabled={false}
            leftIcon={<IconBrandGoogle />}
        >
            Continue with Google
        </Button>
  );
}