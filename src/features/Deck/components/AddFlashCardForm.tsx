import { useEffect, useState } from "react"
import { Input } from "@chakra-ui/input"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { FlashCard } from "@/model/FlashCard"
import { useFormValidation } from "@/shared/hooks/general/useFormValidation";

interface FormFields {
    foreignWord?: string;
    translatedWord?: string;
    foreignExampleSentence?: string;
    translatedExampleSentence?: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (flashcard: FlashCard) => void;
    defaultValue?: FlashCard;
}

export const AddFlashCardForm: React.FC<Props> = ({ formRef, onSubmit, defaultValue }) => {
    const [flashcard, setFlashcard] = useState<FormFields>(defaultValue as FormFields ?? {} as FormFields);
    const { errors, isValid } = useFormValidation<FormFields>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(isValid(flashcard)){
            onSubmit(flashcard as FlashCard);
            setFlashcard({});
        }
    }

    useEffect(() => {
        setFlashcard(defaultValue as FormFields)
    }, [defaultValue]);

    return <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <FormControl isRequired isInvalid={!!errors.foreignWord}>
            <FormLabel>Foreign Word</FormLabel>
            <Input maxLength={100} placeholder='Enter the word'
                value={flashcard.foreignWord ?? ''} onChange={(event) => setFlashcard({...flashcard, foreignWord: event.target.value})} />
            <FormErrorMessage>{errors.foreignWord}</FormErrorMessage>
        </FormControl>

        <FormControl mt={6} isRequired isInvalid={!!errors.translatedWord}>
            <FormLabel>Translated Word</FormLabel>
            <Input maxLength={100} placeholder='Enter the word' value={flashcard.translatedWord ?? ''}
                onChange={(event) => setFlashcard({...flashcard, translatedWord: event.target.value})} />
            <FormErrorMessage>{errors.translatedWord}</FormErrorMessage>
        </FormControl>

        <FormControl mt={6}>
            <FormLabel>Example sentence</FormLabel>
            <Input maxLength={300} placeholder='Enter the sentence' value={flashcard.foreignExampleSentence ?? ''}
                onChange={(event) => setFlashcard({...flashcard, foreignExampleSentence: event.target.value})} />
        </FormControl>

        <FormControl mt={6}>
            <FormLabel>Translated example sentence</FormLabel>
            <Input maxLength={300} placeholder='Enter the sentence' value={flashcard.translatedExampleSentence ?? ''}
                onChange={(event) => setFlashcard({...flashcard, translatedExampleSentence: event.target.value})} />
        </FormControl>
    </form>
}