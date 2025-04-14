import { Box, Button, Card, CardBody, Center, Divider, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/general/useAuth";
import { useLayoutEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { errorToast } from "../utils/toasts";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
    const auth = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const googleLoginButtonRef = useRef<HTMLDivElement>(null);
    const [googleLoginWidth, setGoogleLoginWidth] = useState<number>(280);

    const handleLogin = () => {
        if(!email || !password || !auth) return;

        auth.login(email, password);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleGoogleLogin = (credentialResponse: any) => {
        auth!.loginWithGoogle(credentialResponse.credential);
    }

    // Resize Login with Google button
    useLayoutEffect(() => {
        const updateButtonWidth = () => {
            if (googleLoginButtonRef.current) {
                setGoogleLoginWidth(googleLoginButtonRef.current.clientWidth);
            }
        };

        // First resize
        updateButtonWidth();

        // Resize button on window resize
        window.addEventListener('resize', updateButtonWidth);

        // Cleanup
        return () => {
        window.removeEventListener('resize', updateButtonWidth);
        };
    }, []);

    if(auth?.currentUser) {
        return <Navigate to='/'/>;
    }

    return (
    <Flex justify='center' align='center' h='100%'>
        <Card w='90%' maxW='440px' shadow='xl'>
            <CardBody>
                <Flex direction='column' gap={8}>
                    <Flex direction='column' gap={1}>
                        <Heading size='xl' mb={2}>Welcome back!</Heading>
                        <Text opacity={0.8}>Please enter your login details</Text>
                    </Flex>

                    <Flex direction='column' gap={4}>
                        <Box>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Your email" onChange={(event) => setEmail(event.target.value)}/>
                        </Box>
                        <Box>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Your password" onChange={(event) => setPassword(event.target.value)}/>
                        </Box>
                    </Flex>
                    
                    <Flex direction='column' gap={4}>
                        <Button colorScheme="blue" onClick={() => handleLogin()}>Sign in</Button>

                        <Flex align='center' justify='center' gap={2}>
                            <Divider w='40%'/>
                            <Text opacity={0.8}>or</Text>
                            <Divider w='40%'/>
                        </Flex>

                        <Center style={{ colorScheme: 'light'}} ref={googleLoginButtonRef}>
                            <GoogleLogin
                                onSuccess={credentialResponse => handleGoogleLogin(credentialResponse)}
                                onError={() => errorToast('Login failed')}
                                width={googleLoginWidth + 'px'}
                                locale="en"
                            /> 
                        </Center>
                    </Flex>

                    <Flex gap={2} align='center'>
                        <Text>Don't have an account?</Text>
                        <Button color='blue.200' variant='link'>Sign up</Button>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    </Flex>
    );
}