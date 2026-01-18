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
            <PageHeading title="Flashcards" urlToGoBack={null}/>
            <Scrollable>
                <Flex direction='column' px={4} pb={2} flexGrow={1} gap={6}>
                    <Heading size='2xl'>Hello, {auth!.currentUser!.name}</Heading>
                    <YourWordForToday />
                    <YourGoals />
                    <RecentDecks />
                </Flex>

            </Scrollable>
        </Flex>
    );
}