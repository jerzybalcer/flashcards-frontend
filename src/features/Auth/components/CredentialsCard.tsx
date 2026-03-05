import { CardLayout } from "@/shared/components/CardLayout";
import { Button, Flex, Text } from "@chakra-ui/react";
import { CredentialsForm } from "./CredentialsForm";
import { ContinueWithGoogleButton } from "@/shared/components/ContinueWithGoogleButton";
import { OrHorizontalDivider } from "@/shared/components/OrHorizontalDivider";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { useAuth } from "@/shared/hooks/general/useAuth";
import { useState, useRef } from "react";
import { AuthMode } from "../model/AuthMode";

export const CredentialsCard = () => {
    const auth = useAuth();
    
    const [mode, setMode] = useState<AuthMode>('login');
    const formRef = useRef<HTMLFormElement>(null);

    const getModeText = () => mode === 'login' ? 'Log in' : 'Create an account';
    const getOtherModeText = () => mode !== 'login' ? 'Log in' : 'Create an account';
    const getOtherModeQuestionText = () => mode === 'login' ? 'New here?' : 'Have an account?';
    
    const handleLoginWithEmail = (email: string, password: string) => auth.loginWithEmail(email, password);
    const handleLoginWithGoogle = () => auth.loginWithGoogle();
    const handleCreateAccount = (email: string, password: string) => auth.createAccount(email, password);

    function getHeader(){
        return [<Text fontSize='h1' fontWeight={700}>{getModeText()}</Text>];
    }

    function getBody(){
        return [<CredentialsForm 
            formRef={formRef}
            onSubmit={mode === 'login' ? handleLoginWithEmail : handleCreateAccount}
            isDisabled={auth.isLoginWithEmailLoading || auth.isLoginWithGoogleLoading}
            authMode={mode}
        />];
    }

    function getFooter(){
        return [
            <Flex direction='column' gap={4}>
                <PrimaryButton text={getModeText()} onClick={() => formRef.current?.requestSubmit()} isLoading={auth.isLoginWithEmailLoading} isDisabled={auth.isLoginWithGoogleLoading}/>
                <OrHorizontalDivider />
                <ContinueWithGoogleButton onClick={handleLoginWithGoogle} isLoading={auth.isLoginWithGoogleLoading} isDisabled={auth.isLoginWithEmailLoading} />
            </Flex>
            ,
            <Flex gap={2} justify='center' align='center'>
                <Text fontWeight={500}>{getOtherModeQuestionText()}</Text>
                <Button color='blue.200' variant='link' 
                    onClick={() => setMode(mode == 'login' ? 'register' : 'login')}
                >
                    {getOtherModeText()}
                </Button>
            </Flex>
        ];
    }

    return (
        <CardLayout 
            header={getHeader()} 
            body={getBody()}
            footer={getFooter()}
        />
    );
}