import { useEffect, useRef, useState } from "react";
import { Box, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "react-query";
import { addCard, addCardsFromFile, editCard} from "../services/CardService"
import { FlashCard } from "../model/FlashCard";
import { errorToast, successToast } from "../utils/toasts";
import { FlashCardInputForm } from "./FlashCardInputForm";
import { FileInput } from "./FileInput";

interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, onClose }) => {
    const [foreignWord, setForeignWord] = useState<string>("");
    const [translatedWord, setTranslatedWord] = useState<string>("");
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [file, setFile] = useState<File>()

    const cardMutationFunction = useRef<(card: FlashCard) => Promise<unknown>>();
    const queryClient = useQueryClient();

    const handleSuccess = (toastTitle: string, toastDescription: string) => {
        successToast(toastTitle, toastDescription);
        handleClose();
        queryClient.invalidateQueries('cards');
    };

    const handleError = (error: AxiosError) => {
        errorToast(error.response?.data as string);
    };

    const cardMutation = useMutation((card: FlashCard) => cardMutationFunction.current!(card), 
    {
        onSuccess: () => handleSuccess('Succesfully saved card',`${foreignWord} - ${translatedWord}`),
        onError: handleError,
    });

    const fileMutation = useMutation((file: File) => addCardsFromFile(file), 
    {
        onSuccess: () => handleSuccess('Succesfully saved cards', `Unique cards from file imported`),
        onError: handleError,
    });

    const handleAddCard = async () => {
        const newFlashCard = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            id: flashCard ? flashCard.id : undefined
        } as FlashCard;

        cardMutation.mutate(newFlashCard);
    }

    const handleAddFile = () => {
        fileMutation.mutate(file!);
    };

    const handleSave = () => {
        if(currentTab === 0 ){
            handleAddCard();
        } else{
            handleAddFile();
        }
    };

    const isMutationLoading = currentTab === 0 ? cardMutation.isLoading : fileMutation.isLoading;

    const isSaveEnabled = () => {
        if(currentTab === 0 && foreignWord && translatedWord) return true;

        if(currentTab === 1 && file) return true;

        return false;
    };

    const handleClose = () => {
        setTranslatedWord('');
        setForeignWord('');
        setFile(undefined);
        onClose();
    };

    useEffect(() => {
        if(!flashCard){
            cardMutationFunction.current = addCard;
        }
        else{
            cardMutationFunction.current = editCard;
            setForeignWord(flashCard.foreignWord);
            setTranslatedWord(flashCard.translatedWord);
        }
    }, [flashCard]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} autoFocus={false} returnFocusOnClose={false} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{flashCard ? 'Edit card' : 'New card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {!flashCard && (<Tabs isFitted onChange={(index) => setCurrentTab(index)}>
                    <TabList>
                        <Tab>Manually</Tab>
                        <Tab>From CSV</Tab>
                    </TabList>
                    <TabPanels pt={4}>
                        <TabPanel>
                            <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                            translatednWordOnChange={(value) => setTranslatedWord(value)}
                            foreignDefaultValue={''}
                            translatednWordDefaultValue={''} />                    
                        </TabPanel>
                        <TabPanel gap={4} display='flex' flexDirection='column'>
                            <FileInput onChange={(currentFile) => setFile(currentFile)}/>
                            <FormControl isRequired> 
                                <FormLabel>Delimiter</FormLabel>
                                <Input defaultValue='-' />
                            </FormControl>
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
                <Button colorScheme="blue" mr={3} onClick={() => handleSave()} isLoading={isMutationLoading} isDisabled={!isSaveEnabled()}> Save </Button>
                <Button variant='ghost' onClick={handleClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

