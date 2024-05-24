import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"

interface FlashCardInputFormProps {
    foreignWordOnChange: (value: string) => void;
    translatednWordOnChange: (value: string) => void;    
    foreignDefaultValue: string;
    translatednWordDefaultValue: string
}

export const FlashCardInputForm: React.FC<FlashCardInputFormProps> = ({ ...props}) => {
    return <>
        <FormControl isRequired>
        <FormLabel>Foreign Word</FormLabel>
        <Input maxLength={100} placeholder='Enter the word'
            defaultValue={props.foreignDefaultValue} onChange={(event) => props.foreignWordOnChange(event.target.value)} />
        </FormControl>

        <FormControl mt={6} isRequired>
        <FormLabel>Translated Word</FormLabel>
        <Input maxLength={100} placeholder='Enter the word' defaultValue= {props.translatednWordDefaultValue}
            onChange={(event) => props.translatednWordOnChange(event.target.value)} />
        </FormControl>
    </>
}