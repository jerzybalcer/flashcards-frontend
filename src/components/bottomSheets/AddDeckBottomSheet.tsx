import { BottomSheet } from "./BottomSheet";
import { FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import { useAddDeck } from './../../hooks/forms/useAddDeck';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
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

    function getHeader() {
        return <Text fontWeight='bold'>New deck</Text>;
    }

    function getBody() {
        return ([
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(event) => setName(event.currentTarget.value)}/>
            </FormControl>
            ,
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
        ]);
    }

    function handleConfirm() {
        handleSave();
    }

    return <BottomSheet isOpen={isOpen} confirmText="Save" onConfirm={handleConfirm} header={[getHeader()]} body={getBody()} canClose onClose={handleClose}></BottomSheet>
}