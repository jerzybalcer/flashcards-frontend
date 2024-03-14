import { Button, Flex } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"
import { AddCardModal } from "../components/AddCardModal"
import { SearchBar } from "../components/SearchBar"
import { SortButton } from "../components/SortButton"

export const MyFlashCardsPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);

    return (
        <Flex direction='column' h='100%'>
            <PageHeading title="My Flashcards" />
            <Flex gap={2} mx={4} mb={4}>
                <SearchBar onSearch={(phrase: string) => setCardsSearchPhrase(phrase)} />
                <SortButton />
            </Flex>
            <FlashCardList searchPhrase={cardsSearchPhrase} />
            <Button position='fixed' bottom={0} right={0} m={6} p={2} borderRadius='50%' colorScheme='blue' 
                onClick={() => setAddCardModalOpen(true)} w='4em' h='4em'
            >
                <IconPlus size='60%' />
            </Button>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} />
        </Flex>
    )
}