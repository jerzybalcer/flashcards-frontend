import { Flex } from "@chakra-ui/react"
import { PageHeading } from "@/shared/components/PageHeading";
import { RecentDecks } from "@/features/Home/components/RecentDecks";
import { YourWordForToday } from "@/features/Home/components/YourWordForToday";
import { YourGoals } from "@/features/Home/components/YourGoals";
import { Scrollable } from "@/shared/components/Scrollable";

export const HomePage = () => {

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Dashboard" urlToGoBack={null}/>
            <Scrollable>
                <Flex direction='column' px={1} gap={10}>
                    <YourWordForToday />
                    <YourGoals />
                    <RecentDecks />
                </Flex>

            </Scrollable>
        </Flex>
    );
}