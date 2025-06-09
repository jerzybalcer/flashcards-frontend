import { FormControl, Alert, AlertIcon, VStack, FormLabel, Switch, RadioGroup, HStack, Radio } from "@chakra-ui/react"
import { useLocalStorage } from "usehooks-ts";
import { FlashCardSide } from "../model/FlashCardSide";
import { LearnSettings } from "../model/LearnSettings";

export const LearnSettingsForm = () => {
    const [settings, setSettings] = useLocalStorage<LearnSettings>('learnSettings', { defaultSide: 'foreign', autoRead: false });

    function onAutoReadChange(newValue: boolean) {
        setSettings({...settings, autoRead: newValue});
    }

    function onDefaultSideChange(newValue: FlashCardSide) {
        setSettings({...settings, defaultSide: newValue});
    }


    return  <FormControl display='flex' flexDirection='column' gap={6}>
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
}