import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useAuth } from "../shared/hooks/general/useAuth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { ContinueWithGoogleButton } from "@/shared/components/ContinueWithGoogleButton";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";

export const LoginPage = () => {
    const auth = useAuth();
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    
    const handleLoginWithEmail = () => auth.loginWithEmail(email, password);

    const handleLoginWithGoogle = () => auth.loginWithGoogle();
    
    if(getCurrentUser() !== null) {
        return <Navigate to='/'/>;
    }

    return (
    <Flex h='100%' w='100%'>
        <Flex direction='column' gap={8} w='100%'>
            <Flex direction='column' justify='center' w='100%'>
                <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
            </Flex>

            <Card borderRadius='xl'>
                <CardHeader paddingX={6} paddingY={4}>
                    <Text fontSize='h1' fontWeight={700}>{mode === 'login' ? 'Log in' : 'Create an account to begin'}</Text>
                </CardHeader>
                <CardBody paddingX={6} paddingY={2}>
                    <Flex direction='column' gap={4}>
                        <Box>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="your@email.com" 
                                isDisabled={auth.isLoginWithEmailLoading || auth.isLoginWithGoogleLoading} 
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="your password" 
                                isDisabled={auth.isLoginWithEmailLoading || auth.isLoginWithGoogleLoading} 
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Box>
                    </Flex>
                </CardBody>
                <CardFooter display='flex' flexDir='column' gap={6}>
                    <Flex direction='column' gap={4}>
                        <PrimaryButton text="Log in" onClick={handleLoginWithEmail} isLoading={auth.isLoginWithEmailLoading} isDisabled={auth.isLoginWithGoogleLoading}/>
                        <Flex align='center' justify='center' gap={2}>
                            <Divider w='40%'/>
                            <Text opacity={0.8}>or</Text>
                            <Divider w='40%'/>
                        </Flex>

                        <ContinueWithGoogleButton onClick={handleLoginWithGoogle} isLoading={auth.isLoginWithGoogleLoading} isDisabled={auth.isLoginWithEmailLoading} />
                    </Flex>

                    <Flex gap={2} justify='center' align='center'>
                        <Text fontWeight={500}>New here?</Text>
                        <Button color='blue.200' variant='link' 
                            onClick={() => setMode(mode == 'login' ? 'register' : 'login')}
                        >
                            Create an account
                        </Button>
                    </Flex>
                </CardFooter>
            </Card>
        </Flex>
    </Flex>
    );
}