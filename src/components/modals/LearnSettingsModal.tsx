import { IconButton, Switch, FormControl, FormLabel, RadioGroup, Radio, HStack, Modal, ModalOverlay, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { LearnSettings } from "../../model/LearnSettings";
import { FlashCardSide } from "../../model/FlashCardSide";
import { useLocalStorage } from "usehooks-ts";

export const LearnSettingsModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [settings, setSettings] = useLocalStorage<LearnSettings>('learnSettings', { defaultSide: 'foreign', autoRead: false });

    function onAutoReadChange(newValue: boolean) {
        setSettings({...settings, autoRead: newValue});
    }

    function onDefaultSideChange(newValue: FlashCardSide) {
        setSettings({...settings, defaultSide: newValue});
    }

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
                        <Alert status='warning' >
                            <AlertIcon />
                            Speech synthesis may not work on all devices.
                        </Alert>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Auto read</FormLabel>
                            <Switch size='md' isChecked={settings.autoRead} onChange={(ev) => onAutoReadChange(ev.currentTarget.checked)}/>
                        </VStack>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Default side</FormLabel>
                            <RadioGroup value={settings.defaultSide} onChange={onDefaultSideChange}>
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