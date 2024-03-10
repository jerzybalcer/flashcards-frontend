import { Flex } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { SearchBar } from "../components/SearchBar"
import { SortButton } from "../components/SortButton"
import { useState } from "react"

export const MyFlashCardsPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');

    return (
        <Flex direction='column'>
            <PageHeading title="My Flashcards" />
            <Flex gap={2} mx={4}>
                <SearchBar onSearch={(phrase: string) => setCardsSearchPhrase(phrase)} />
                <SortButton />
            </Flex>
            <FlashCardList searchPhrase={cardsSearchPhrase} />
        </Flex>
    )
}