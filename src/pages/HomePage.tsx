import { Flex, Heading } from "@chakra-ui/react"
import { useAuth } from "@/shared/hooks/general/useAuth";
import { PageHeading } from "@/shared/components/PageHeading";
import { RecentDecks } from "@/features/Home/components/RecentDecks";
import { YourWordForToday } from "@/features/Home/components/YourWordForToday";
import { YourGoals } from "@/features/Home/components/YourGoals";
import { Scrollable } from "@/shared/components/Scrollable";

export const HomePage = () => {
    const auth = useAuth();

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Cardify" urlToGoBack={null}/>
            <Scrollable>
                <Flex direction='column' px={1} gap={6}>
                    <Heading fontSize='36px' fontFamily='Playwrite US Modern' fontWeight={400}>Hello, {auth!.currentUser!.name}</Heading>
                    <Flex direction='column' gap={10}>
                        <YourWordForToday />
                        <YourGoals />
                        <RecentDecks />
                    </Flex>
                </Flex>

            </Scrollable>
        </Flex>
    );
}