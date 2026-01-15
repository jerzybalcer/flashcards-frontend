import { useRef, useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useAddCard } from "../../hooks/mutations/useAddCard";
import { useAddCardsFromFile } from "../../hooks/mutations/useAddCardsFromFile";
import { FlashCard } from "@/model/FlashCard";
import { FileInputForm } from "@/features/Deck/components/FileInputForm";
import { AddFlashCardForm } from "@/features/Deck/components/AddFlashCardForm";
import { FlashCardsFile } from "@/model/FlashCardsFile";

interface Props {
    isOpen: boolean;
    flashCard?: FlashCard;
    deckId: number;
    onClose: () => void;
}

export const AddCardDialog: React.FC<Props> = ({ isOpen, flashCard, deckId, onClose }) => {
    const { handleSave, isLoading: isAddCardLoading } = useAddCard(deckId);
    const { handleAddFile, isLoading: isAddFileLoading } = useAddCardsFromFile(deckId);

    const formRef = useRef<HTMLFormElement>(null);
    const fileFormRef = useRef<HTMLFormElement>(null);

    const [currentTab, setCurrentTab] = useState<number>(0);
    const addingFromFile = currentTab === 1;

    function handleConfirm() {
        addingFromFile ? fileFormRef.current?.requestSubmit() : formRef.current?.requestSubmit();
    }

    function handleSubmit(flashcard: FlashCard) {
        handleSave(flashcard).then(() => onClose());
    }

    function handleFileSubmit(file: FlashCardsFile) {
        handleAddFile(file).then(() => onClose());
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={false} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader fontWeight='bold'>{flashCard ? 'Edit card' : 'New card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {!flashCard && (<Tabs isFitted onChange={(index) => setCurrentTab(index)}>
                    <TabList>
                        <Tab>Manually</Tab>
                        <Tab>From file</Tab>
                    </TabList>
                    <TabPanels pt={4}>
                        <TabPanel>
                            <AddFlashCardForm formRef={formRef} onSubmit={handleSubmit} />              
                        </TabPanel>
                        <TabPanel>
                            <FileInputForm formRef={fileFormRef} onSubmit={handleFileSubmit}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                )}
                {flashCard && (
                    <AddFlashCardForm formRef={formRef} onSubmit={handleSubmit} />       
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={4} onClick={handleConfirm} isLoading={addingFromFile ? isAddFileLoading : isAddCardLoading}>Save</Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

