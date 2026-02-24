import { Flex, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { CredentialsCard } from "@/features/Auth/components/CredentialsCard";


export const AuthPage = () => {
    
    if(getCurrentUser() !== null) {
        return <Navigate to='/'/>;
    }

    return (
    <Flex h='100%' w='100%' direction='column' gap={8}>
        <Flex justify='center' w='100%' h='40px'>
            <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
        </Flex>
       <CredentialsCard />
    </Flex>
    );
}