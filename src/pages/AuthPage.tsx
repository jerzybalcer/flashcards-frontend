import { Flex, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { CredentialsCard } from "@/features/Auth/components/CredentialsCard";
import { useState } from "react";
import { AuthStep } from "@/features/Auth/model/AuthStep";
import { CustomizeCard } from "@/features/Auth/components/CustomizeCard";

export const AuthPage = () => {
    const [currentStep, _] = useState<AuthStep>(AuthStep.Customize);
    
    if(getCurrentUser() !== null) {
        return <Navigate to='/'/>;
    }

    function renderCurrentStep(){
        switch(currentStep){
            case AuthStep.Credentials:
                return <CredentialsCard />;
            case AuthStep.Customize:
                return <CustomizeCard />;
        }
    }

    return (
    <Flex h='100%' w='100%' direction='column' gap={8}>
        <Flex direction='column' justify='center' w='100%'>
            <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
        </Flex>
       {renderCurrentStep()}
    </Flex>
    );
}