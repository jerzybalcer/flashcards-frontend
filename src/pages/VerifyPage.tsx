import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useVerifyAccount } from "@/features/Verify/hooks/mutations/useVerifyAccount";

export const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { handleVerification, isLoading: isVerificationLoading } = useVerifyAccount();
    
    useEffect(() => {
        if (token) {
            handleVerification(token);
        }
    }, [token]);

    return (
        <Flex h='100%' w='100%' direction='column' gap={8}>
            <Flex justify='center' w='100%' align='center' h='40px'>
                <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
            </Flex>
            <Heading fontSize='h1'>Verify your account</Heading>
            {isVerificationLoading ? (
                <Box>
                    <Spinner />
                    <Text fontSize='t1'>Verifying your account</Text>
                </Box>
            ) : (
                <Text fontSize='t1'>Check your inbox for a verification link</Text>
            )}
        </Flex>
    );
}