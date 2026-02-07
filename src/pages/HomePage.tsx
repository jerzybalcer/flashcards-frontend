import { Flex, useDisclosure } from "@chakra-ui/react"
import { PageHeading } from "@/shared/components/PageHeading";
import { RecentDecks } from "@/features/Home/components/RecentDecks";
import { YourWordsForToday } from "@/features/Home/components/YourWordsForToday";
import { YourGoals } from "@/features/Home/components/YourGoals";
import { Scrollable } from "@/shared/components/Scrollable";
import { YourWordsForTodayBottomSheet } from "@/features/Home/components/bottomSheets/YourWordsForTodayBottomSheet";

export const HomePage = () => {
    const yourWordsForTodayModal = useDisclosure();

    function handleYourWordsForTodayInfoClick() {
        yourWordsForTodayModal.onToggle();
    }

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Dashboard" urlToGoBack={null}/>
            <Scrollable>
                <Flex direction='column' px={1} gap={10}>
                    <YourWordsForToday onInfoClick={() => handleYourWordsForTodayInfoClick()}/>
                    <RecentDecks />
                    <YourGoals />
                </Flex>
            </Scrollable>
            <YourWordsForTodayBottomSheet isOpen={yourWordsForTodayModal.isOpen} onClose={yourWordsForTodayModal.onClose} />
        </Flex>
    );
}