import { Box, Button, Divider, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
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
    
    const handleLoginWithEmail = () => auth.loginWithEmail(email, password);

    const handleLoginWithGoogle = () => auth.loginWithGoogle();
    
    if(getCurrentUser() !== null) {
        return <Navigate to='/'/>;
    }

    return (
    <Flex h='100%'>
        <Flex direction='column' gap={8}>
            <Flex direction='column' gap={1}>
                <Heading fontSize='h1' mb={2} fontFamily='Playwrite US Modern'>A perfect day to study with Flashcards</Heading>
                <Text fontSize='t1'>Enter your info - we'll take it from here</Text>
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
                <PrimaryButton text="Log in" onClick={handleLoginWithEmail} isLoading={auth.isLoginWithEmailLoading} isDisabled={auth.isLoginWithGoogleLoading}/>

                <Flex align='center' justify='center' gap={2}>
                    <Divider w='40%'/>
                    <Text opacity={0.8}>or</Text>
                    <Divider w='40%'/>
                </Flex>

                <ContinueWithGoogleButton onClick={handleLoginWithGoogle} isLoading={auth.isLoginWithGoogleLoading} isDisabled={auth.isLoginWithEmailLoading} />
            </Flex>

            <Flex gap={2} align='center'>
                <Text>Don't have an account?</Text>
                <Button color='blue.200' variant='link'>Register</Button>
            </Flex>
        </Flex>
    </Flex>
    );
}