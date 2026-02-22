import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../shared/hooks/general/useAuth";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { ContinueWithGoogleButton } from "@/shared/components/ContinueWithGoogleButton";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { OrHorizontalDivider } from "@/shared/components/OrHorizontalDivider";
import { CredentialsForm } from "@/features/Auth/components/CredentialsForm";

export const AuthPage = () => {
    const auth = useAuth();
    
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const formRef = useRef<HTMLFormElement>(null);

    const getModeText = () => mode === 'login' ? 'Log in' : 'Create an account';
    const getOtherModeText = () => mode !== 'login' ? 'Log in' : 'Create an account';
    const getOtherModeQuestionText = () => mode === 'login' ? 'New here?' : 'Have an account?';
    
    const handleLoginWithEmail = (email: string, password: string) => auth.loginWithEmail(email, password);
    const handleLoginWithGoogle = () => auth.loginWithGoogle();
    
    if(getCurrentUser() !== null) {
        return <Navigate to='/'/>;
    }

    return (
    <Flex h='100%' w='100%' direction='column' gap={8}>
        <Flex direction='column' justify='center' w='100%'>
            <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
        </Flex>

        <Card borderRadius='xl'>
            <CardHeader paddingX={6} paddingY={4}>
                <Text fontSize='h1' fontWeight={700}>{getModeText()}</Text>
            </CardHeader>
            <CardBody paddingX={6} paddingY={2}>
                <CredentialsForm 
                    formRef={formRef}
                    onSubmit={handleLoginWithEmail}
                    isDisabled={auth.isLoginWithEmailLoading || auth.isLoginWithGoogleLoading} 
                />
            </CardBody>
            <CardFooter display='flex' flexDir='column' gap={6}>
                <Flex direction='column' gap={4}>
                    <PrimaryButton text={getModeText()} onClick={() => formRef.current?.requestSubmit()} isLoading={auth.isLoginWithEmailLoading} isDisabled={auth.isLoginWithGoogleLoading}/>
                    <OrHorizontalDivider />
                    <ContinueWithGoogleButton onClick={handleLoginWithGoogle} isLoading={auth.isLoginWithGoogleLoading} isDisabled={auth.isLoginWithEmailLoading} />
                </Flex>

                <Flex gap={2} justify='center' align='center'>
                    <Text fontWeight={500}>{getOtherModeQuestionText()}</Text>
                    <Button color='blue.200' variant='link' 
                        onClick={() => setMode(mode == 'login' ? 'register' : 'login')}
                    >
                        {getOtherModeText()}
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    </Flex>
    );
}