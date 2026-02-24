import { SetUpProfileCard } from "@/features/Onboarding/components/SetUpProfileCard";
import { useAuth } from "@/shared/hooks/general/useAuth";
import { Flex, Heading, IconButton, Box } from "@chakra-ui/react";
import { IconLogout2 } from "@tabler/icons-react";

export const OnboardingPage = () => {
    const { logout } = useAuth();

    return (
    <Flex h='100%' w='100%' direction='column' gap={8}>
        <Flex justify='space-between' w='100%' align='center' h='40px'>
            <IconButton variant='ghost' aria-label="logout" icon={<IconLogout2 color='var(--chakra-colors-red-200)' />} onClick={logout} />
            <Heading fontSize='t1' textAlign='center' fontFamily='Playwrite US Modern'>Flashcards</Heading>
            <Box w='40px' h='40px'/>
        </Flex>
       <SetUpProfileCard />
    </Flex>
    );
}