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
            <FlashCardList searchPhrase={cardsSearchPhrase} onAddCardModalOpen={() => setAddCardModalOpen(true)}/>
            <AddCardModal isOpen={isAddCardModalOpen} onClose={() => setAddCardModalOpen(false)} />
        </Flex>
    )
}