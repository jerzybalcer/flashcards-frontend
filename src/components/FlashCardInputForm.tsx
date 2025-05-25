import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"

interface FlashCardInputFormProps {
    foreignWordOnChange: (value: string) => void;
    translatednWordOnChange: (value: string) => void;  
    foreignExampleSentenceOnChange: (value: string | null) => void;  
    translatedExampleSentenceOnChange: (value: string | null) => void;  
    foreignDefaultValue: string;
    translatednWordDefaultValue: string;
    foreignExampleSentenceDefaultValue: string | null;
    translatedExampleSentenceDefaultValue: string | null;
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

        <FormControl mt={6}>
        <FormLabel>Example sentence</FormLabel>
        <Input maxLength={300} placeholder='Enter the sentence' defaultValue={props.foreignExampleSentenceDefaultValue ?? ''}
            onChange={(event) => props.foreignExampleSentenceOnChange(event.target.value)} />
        </FormControl>

        <FormControl mt={6}>
        <FormLabel>Translated example sentence</FormLabel>
        <Input maxLength={300} placeholder='Enter the sentence' defaultValue={props.translatedExampleSentenceDefaultValue ?? ''}
            onChange={(event) => props.translatedExampleSentenceOnChange(event.target.value)} />
        </FormControl>
    </>
}