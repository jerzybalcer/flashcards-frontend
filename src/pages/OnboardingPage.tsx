import { SetUpProfileCard } from "@/features/Onboarding/components/SetUpProfileCard";
import { Flex, Heading } from "@chakra-ui/react";

export const OnboardingPage = () => {
    return (
    <Flex h='100%' w='100%' direction='column' gap={8}>
        <Flex direction='column' justify='center' w='100%'>
            <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
        </Flex>
       <SetUpProfileCard />
    </Flex>
    );
}