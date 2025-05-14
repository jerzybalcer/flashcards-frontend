import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useAddDeck } from "../../hooks/mutations/useAddDeck";

interface AddDeckModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckModal: React.FC<AddDeckModalProps> = ({ isOpen, onClose }) => {
    const { 
        languagesLoading, 
        languages, 
        name, 
        setName, 
        languageId, 
        setLanguageId, 
        handleClose, 
        handleSave 
    } = useAddDeck(onClose);

    return (
    <Modal isOpen={isOpen} onClose={() => handleClose()} autoFocus={false} returnFocusOnClose={false} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontWeight='bold'>New deck</ModalHeader>
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
            <Button colorScheme="blue" mr={4} onClick={() => handleSave()}>Save</Button>
            <Button variant='ghost' onClick={() => handleClose()}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    );
}