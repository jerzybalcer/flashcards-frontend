import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { errorToast, successToast } from "../../utils/toasts";
import { NewDeck } from "../../model/NewDeck";
import { useLanguages } from "../../hooks/queries/useLanguages";
import { QueryKeys } from "../../hooks/queries/queryKeys";
import { useAddDeck } from "../../hooks/mutations/useAddDeck";

interface AddDeckModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckModal: React.FC<AddDeckModalProps> = ({ isOpen, onClose }) => {
    const { isFetching: languagesLoading, data: languages } = useLanguages();

    const [name, setName] = useState<string>('');
    const [languageId, setLanguageId] = useState<string>('');

    const queryClient = useQueryClient();

    const addDeck = useAddDeck();

    const handleSuccess = (toastTitle: string, toastDescription: string) => {
        successToast(toastTitle, toastDescription);
        handleClose();
        queryClient.invalidateQueries(QueryKeys.allDecks);
    };

    const handleError = (error: AxiosError) => {
        errorToast(error.response?.data as string);
    };

    const deckMutation = useMutation((deck: NewDeck) => addDeck(deck), 
    {
        onSuccess: () => handleSuccess('Succesfully saved deck', name),
        onError: handleError,
    });

    const handleClose = () => {
        setName('');
        setLanguageId('');
        onClose();
    }

    const handleSave = () => {
        const newDeck: NewDeck = {
            name: name,
            languageId: languageId
        };

        deckMutation.mutate(newDeck);
    }

    return (
    <Modal isOpen={isOpen} onClose={() => handleClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>New deck</ModalHeader>
            <ModalCloseButton />
            <ModalBody display='flex' flexDirection='column' gap={4}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input value={name} onChange={(event) => setName(event.currentTarget.value)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Language</FormLabel>
                    <Select isDisabled={languagesLoading} placeholder="Select language" value={languageId} 
                        onChange={(event) => setLanguageId(event.currentTarget.value)}>
                        {languages?.map(language => 
                        <option key={language.id} value={language.id}>
                            {language.name}
                        </option>
                        )}
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="blue" mr={4} isDisabled={languagesLoading} onClick={() => handleSave()}>Save</Button>
            <Button variant='ghost' onClick={() => handleClose()}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    );
}