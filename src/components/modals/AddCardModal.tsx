import { useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { FlashCard } from "../../model/FlashCard";
import { FlashCardInputForm } from "../FlashCardInputForm";
import { FileInputForm } from "../FileInputForm";
import { useAddCard } from "../../hooks/mutations/useAddCard";
import { useAddCardsFromFile } from "../../hooks/mutations/useAddCardsFromFile";

interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    deckId: number;
    onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, deckId, onClose }) => {
    const { setForeignWord, setTranslatedWord, handleSave, isLoading: isAddCardLoading } = useAddCard(deckId);
    const { setFile, setDelimiter, handleAddFile, isLoading: isAddFileLoading } = useAddCardsFromFile(deckId);

    const [currentTab, setCurrentTab] = useState<number>(0);
    const addingFromFile = currentTab === 1;

    function handleConfirm() {
        if(addingFromFile){
            handleAddFile().then(() => handleClose());
        }
        else{
            handleSave().then(() => handleClose());
        }
    }

    function handleClose(){
        setForeignWord('');
        setTranslatedWord('');
        setFile(undefined);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} autoFocus={false} returnFocusOnClose={false} isCentered>
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
                            <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                            translatednWordOnChange={(value) => setTranslatedWord(value)}
                            foreignDefaultValue={''}
                            translatednWordDefaultValue={''} />                    
                        </TabPanel>
                        <TabPanel>
                            <FileInputForm onFileChange={(file) => setFile(file)} onDelimiterChange={(delimiter) => setDelimiter(delimiter)}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                )}
                {flashCard && (
                    <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                    translatednWordOnChange={(value) => setTranslatedWord(value)}
                    foreignDefaultValue={flashCard.foreignWord}
                    translatednWordDefaultValue={flashCard.translatedWord} />          
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={4} onClick={handleConfirm} isLoading={addingFromFile ? isAddFileLoading : isAddCardLoading}>Save</Button>
                <Button variant='ghost' onClick={handleClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

