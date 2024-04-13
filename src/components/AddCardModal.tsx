import { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
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
        setTranslatedWord('');
        setForeignWord('');
        setFile(undefined);
        onClose();
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
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{flashCard ? 'Edit card' : 'Add new card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {!flashCard && (<Tabs variant='enclosed' colorScheme='green' isFitted onChange={(index) => setCurrentTab(index)}>
                    <TabList>
                        <Tab>Manually</Tab>
                        <Tab>From CSV</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                            translatednWordOnChange={(value) => setTranslatedWord(value)}
                            foreignDefaultValue={''}
                            translatednWordDefaultValue={''} />                    
                        </TabPanel>
                        <TabPanel>
                            <FileInput onChange={(currentFile) => setFile(currentFile)}/>
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
                <Button colorScheme='teal' mr={3} onClick={() => handleSave()} isLoading={cardMutation.isLoading}> Save </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

