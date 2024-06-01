import { IconButton, Switch, FormControl, FormLabel, RadioGroup, Radio, HStack, Modal, ModalOverlay, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, VStack } from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useLearnSettings } from "../../hooks/useLearnSettings";
import { FlashCardSide } from "../../model/FlashCardSide";

export const LearnSettingsModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isAutoReadEnabled, defaultSide, setAutoReadEnabled, setDefaultSide } = useLearnSettings();

    return (
        <>
            <IconButton variant='ghost' aria-label='Settings' icon={<IconDotsVertical />} onClick={() => setIsOpen(true)}/>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display='flex' flexDirection='column' gap={6}>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Auto read</FormLabel>
                            <Switch size='md' isChecked={isAutoReadEnabled} onChange={(event) => setAutoReadEnabled(event.currentTarget.checked)}/>
                        </VStack>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Default side</FormLabel>
                            <RadioGroup value={defaultSide} onChange={(value) => setDefaultSide(value as FlashCardSide)}>
                                <HStack gap={4}>
                                    <Radio value='foreign'>Foreign</Radio>
                                    <Radio value='translated'>Translated</Radio>
                                </HStack>
                            </RadioGroup>
                        </VStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}