import { useState } from "react"
import { Box, Button, Flex, Heading, Tag, Text } from "@chakra-ui/react"
import { FlashCardList } from "../components/FlashCardList"
import { PageHeading } from "../components/PageHeading"
import { AddCardModal } from "../components/modals/AddCardModal"
import { FlashCard } from "../model/FlashCard"
import { useNavigate, useParams } from "react-router-dom"
import { ListNavigation } from "../components/ListNavigation/ListNavigation"
import { IconCheckbox, IconSchool } from "@tabler/icons-react"
import { Loading } from "../components/Loading"
import { useDeck } from "../hooks/queries/useDeck"
import { useDebounce } from "../hooks/general/useDebounce"
import { SortCardsSettings } from "../model/SortCardsSettings"
import { SortCardsBy } from "../model/SortCardsBy"
import { SortCardsBottomSheet } from "../components/bottomSheets/SortCardsBottomSheet"
import { useLocalStorage } from "usehooks-ts"
import { useIsMobile } from "../hooks/general/useIsMobile"
import { AddCardBottomSheet } from "../components/bottomSheets/AddCardBottomSheet"
import { EditCardBottomSheet } from "../components/bottomSheets/EditCardBottomSheet"
import { DeckDetailsBottomSheet } from "../components/bottomSheets/DeckDetailsBottomSheet"
import { DeleteDeckConfirmationModal } from "../components/modals/DeleteDeckConfirmationModal"
import { ThreeDotsButton } from "../components/ThreeDotsButton"

export const DeckPage = () => {
    const [cardsSearchPhrase, setCardsSearchPhrase] = useState<string>('');
    const [isAddCardOpen, setAddCardOpen] = useState<boolean>(false);
    const [isEditCardOpen, setEditCardOpen] = useState<boolean>(false);
    const [flashCardInEdit, setFlashCardInEdit] = useState<FlashCard | undefined>();
    const [isSortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [sortSettings] = useLocalStorage<SortCardsSettings>('sortCardsSettings', { sortBy: SortCardsBy.DateAdded, direction: 'descending'});
    const [isDeckDetailsOpen, setDeckDetailsOpen] = useState<boolean>(false);
    const [isDeleteDeckConfirmationOpen, setDeleteDeckConfirmationOpen] = useState<boolean>(false);

    const debouncedSearchPhrase = useDebounce<string>(cardsSearchPhrase, 250);

    const { deckId } = useParams();
    const navigate = useNavigate();

    const { isFetching: deckLoading, data: deck } = useDeck(Number(deckId));

    function handleEditCardOpen(flashCard?: FlashCard) {
        setFlashCardInEdit(flashCard);
        setEditCardOpen(true);
    }

    function handleAddCardOpen() { setAddCardOpen(true) }
    function handleSortMenuOpen() { setSortMenuOpen(true) }
    function handleDeckDetailsOpen() { setDeckDetailsOpen(true) }
    function handleDeleteDeckConfirmationOpen() { setDeleteDeckConfirmationOpen(true) }
    function handleEditCardClose(){ setEditCardOpen(false) }
    function handleAddCardClose(){ setAddCardOpen(false) }
    function handleSortMenuClose(){ setSortMenuOpen(false) }
    function handleDeckDetailsClose(){ setDeckDetailsOpen(false) }
    function handleDeleteDeckConfirmationClose(){ setDeleteDeckConfirmationOpen(false) }

    const isMobile = useIsMobile();

    function renderEditCardForm() {
        if(!flashCardInEdit) return <></>

        if(isMobile) {
            return <EditCardBottomSheet isOpen={isEditCardOpen} flashCard={flashCardInEdit} deckId={Number(deckId)} onClose={handleEditCardClose}/>
        }
        else{
            // TODO: Change this to modal
            return <EditCardBottomSheet isOpen={isEditCardOpen} flashCard={flashCardInEdit} deckId={Number(deckId)} onClose={handleEditCardClose}/>;
        }
    }

    function renderAddCardForm() {
        if(isMobile) {
            return <AddCardBottomSheet isOpen={isAddCardOpen} deckId={Number(deckId)} onClose={handleAddCardClose}/>;
        }
        else{
            return <AddCardModal isOpen={isAddCardOpen} onClose={handleAddCardClose} flashCard={flashCardInEdit} deckId={Number(deckId)}/>;
        }
    }

    function renderSortMenu() {
        if(isMobile){
            return <SortCardsBottomSheet isOpen={isSortMenuOpen} onClose={handleSortMenuClose}/>;
        }
        else{
            // TODO: Change this to context menu
            return <SortCardsBottomSheet isOpen={isSortMenuOpen} onClose={handleSortMenuClose}/>;
        }
    }

    function renderDeckDetails(){
        if(!deck) return <></>;

        return <DeckDetailsBottomSheet isOpen={isDeckDetailsOpen} onClose={handleDeckDetailsClose} deck={deck} onDelete={handleDeleteDeckConfirmationOpen}/>
    }

    return (
        <Flex direction='column' h='100%' w='100%'>
            <PageHeading title="Deck" urlToGoBack='/decks' />

            {deckLoading && <Loading />}
            {!deckLoading && deck &&
            (<Flex direction='column' px={4} gap={4} h='90%' overflowY='auto'>
                <Flex direction='column' gap={2}>
                    <Box>
                        <Tag size='md' colorScheme="blue" variant='subtle'>{deck.languageName.toUpperCase()}</Tag>
                    </Box>
                    <Flex justify='space-between' align='center'>
                        <Heading size='lg'>{deck.name}</Heading>
                        <ThreeDotsButton onClick={handleDeckDetailsOpen}  />
                    </Flex>
                </Flex>

                <Flex gap={2} mb={6}>
                    <Button flexGrow={1} py={12} onClick={() => navigate(`/decks/${deck.id}/learn`)}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconSchool size={32}/>
                            <Text>Learn</Text>
                        </Flex>
                    </Button>
   
                    <Button flexGrow={1} py={12} onClick={() => navigate(`/decks/${deck.id}/quiz`)}>
                        <Flex direction='column' justify='center' align='center' gap={4}>
                            <IconCheckbox size={32}/>
                            <Text>Quiz</Text>
                        </Flex>
                    </Button>
                </Flex>

                <Heading size='md'>Flashcards</Heading>
                <ListNavigation onAddClick={handleAddCardOpen} onSearch={(phrase) => setCardsSearchPhrase(phrase)} onSortClick={handleSortMenuOpen}/>
                <FlashCardList onEditCardFormOpen={handleEditCardOpen} searchPhrase={debouncedSearchPhrase} sortSettings={sortSettings} foreignLanguageName={deck.languageName}/>
            </Flex>)}

            {renderAddCardForm()}
            {renderEditCardForm()}
            {renderSortMenu()}

            {deck && 
            <>
                {renderDeckDetails()}
                <DeleteDeckConfirmationModal isOpen={isDeleteDeckConfirmationOpen} onClose={handleDeleteDeckConfirmationClose} deck={deck}/>
            </>}
        </Flex>
    )
}