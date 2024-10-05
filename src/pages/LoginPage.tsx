import { Box, Button, Card, CardBody, Divider, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/general/useAuth";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";

export const LoginPage = () => {
    const auth = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if(!email || !password || !auth) return;

        auth.login(email, password);
    }

    const handleGoogleLogin = () => {
        
    }

    return (
    <Flex justify='center' align='center' h='100%'>
        <Card w='90%' maxW='600px' shadow='xl'>
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

                        <Button variant='outline' colorScheme="blue" onClick={() => handleGoogleLogin()} leftIcon={<IconBrandGoogle strokeWidth={1} />}>
                            Sign in with Google
                        </Button>
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