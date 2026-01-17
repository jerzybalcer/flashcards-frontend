import { Flex, Heading } from "@chakra-ui/react"
import { useAuth } from "@/shared/hooks/general/useAuth";
import { PageHeading } from "@/shared/components/PageHeading";

export const HomePage = () => {
    const auth = useAuth();

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Flashcards" urlToGoBack={null}/>
                <Flex justify='space-between' align='center' gap={4}>
                <Heading size='2xl'>Hello, {auth!.currentUser!.name}</Heading>
            </Flex>
            <Flex direction='column' px={4} pb={2} flexGrow={1} gap={8}>
            </Flex>
        </Flex>
    );
}