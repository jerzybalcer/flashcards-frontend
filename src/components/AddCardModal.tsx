import { Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import {addCard, addCardsFromFile, editCard} from "../services/CardService"
import { FlashCard } from "../model/FlashCard";
import { AxiosError } from 'axios';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FlashCardInputForm } from "./FlashCardInputForm";
import { IconUpload } from "@tabler/icons-react";


interface AddCardModalProps {
    isOpen: boolean;
    flashCard?: FlashCard;
    onClose: () => void;
    refreshCardList: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, flashCard, onClose, refreshCardList }) => {
    const [foreignWord, setForeignWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")
    const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

    const toast = useToast()

    const handleAddCard = async () => {
        setIsCardAdding(true);

        const card = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            id: flashCard ? flashCard.id : undefined
        } as FlashCard;
        
        let promise;

        if (!flashCard) promise = addCard(card) 
        else promise = editCard(card)

        promise
            .then(() => {
                toast({
                    title: 'Succesfully saved card',
                    description: `${foreignWord} - ${translatedWord}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });

                onClose();
                refreshCardList();

                setTranslatedWord('');
                setForeignWord('')
            })
            .catch((err: AxiosError) => {
                toast({
                    title: 'Error',
                    description: err.response?.data as string,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });
            })
            .finally(() => {
                setIsCardAdding(false);
            })
    }

    useEffect(() => {
        if(!flashCard) return;

        setForeignWord(flashCard.foreignWord);
        setTranslatedWord(flashCard.translatedWord);
    }, [flashCard]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{flashCard ? 'Edit card' : 'Add new card'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {!flashCard && (<Tabs variant='enclosed' colorScheme='green' isFitted>
                    <TabList>
                        <Tab>Raw input</Tab>
                        <Tab>From CSV</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                            translatednWordOnChange={(value) => setForeignWord(value)}
                            foreignDefaultValue={''}
                            translatednWordDefaultValue={''} />                    
                        </TabPanel>
                        <TabPanel>
                        <Button
                            height='100px'
                            width='380px'
                            border='2px'
                            borderStyle='dashed'
                            variant = 'ghost'>
                            <Input type='file' w ='100%' h='100%' opacity='0' 
                                position='absolute' onChange={(event) => addCardsFromFile(event.target.files![0] as File)}></Input>
                            <Flex direction='column' justifyContent='center' alignItems = 'center' gap={2}> 
                                <IconUpload></IconUpload>
                                Choose file to upload
                                <Text color='gray' fontSize='sm'>Supported formats: CSV</Text>
                            </Flex>
                        </Button>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                )}
                {flashCard && (
                    <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                    translatednWordOnChange={(value) => setForeignWord(value)}
                    foreignDefaultValue={flashCard.foreignWord}
                    translatednWordDefaultValue={flashCard.translatedWord} />          
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={() => handleAddCard()} isLoading={isCardAdding}> {flashCard ? 'Edit Item' : 'Add Item'} </Button>
                <Button variant='ghost' onClick={onClose}> Close </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

