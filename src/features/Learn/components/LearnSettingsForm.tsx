import { FlashCardSide } from "@/model/FlashCardSide";
import { LearnSettings } from "@/model/LearnSettings";
import { RadioCardGroup } from "@/shared/components/RadioCardGroup";
import { FormControl, Alert, AlertIcon, VStack, FormLabel, Switch } from "@chakra-ui/react"
import { useLocalStorage } from "usehooks-ts";

export const LearnSettingsForm = () => {
    const [settings, setSettings] = useLocalStorage<LearnSettings>('learnSettings', { defaultSide: 'foreign', autoRead: false });

    function onAutoReadChange(newValue: boolean) {
        setSettings({...settings, autoRead: newValue});
    }

    function onDefaultSideChange(newValue: FlashCardSide) {
        setSettings({...settings, defaultSide: newValue});
    }


    return  <FormControl display='flex' flexDirection='column' gap={6}>
                        <Alert status='warning' fontSize='bd'>
                            <AlertIcon />
                            Speech synthesis may not work on all devices.
                        </Alert>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Auto read</FormLabel>
                            <Switch size='lg' isChecked={settings.autoRead} onChange={(ev) => onAutoReadChange(ev.currentTarget.checked)}/>
                        </VStack>
                        <VStack gap={2} align='start'>
                            <FormLabel mb='0'>Default side</FormLabel>
                            <RadioCardGroup defaultValue={settings.defaultSide} 
                                onChange={(value) => onDefaultSideChange(value as FlashCardSide)}
                                options={['foreign', 'translated']}
                                />
                        </VStack>
                    </FormControl>
}