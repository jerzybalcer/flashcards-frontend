import { useEffect } from "react"
import { Input } from "@chakra-ui/input"
import { useForm } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { FlashCard } from "@/model/FlashCard"

interface FormFields {
    foreignWord: string;
    translatedWord: string;
    foreignExampleSentence: string;
    translatedExampleSentence: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (flashcard: FlashCard) => void;
    defaultValue?: FlashCard;
}

export const AddFlashCardForm: React.FC<Props> = ({ formRef, onSubmit, defaultValue }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>({
        defaultValues: {
          foreignWord: defaultValue?.foreignWord ?? '',
          translatedWord: defaultValue?.translatedWord ?? '',
          foreignExampleSentence: defaultValue?.foreignExampleSentence ?? '',
          translatedExampleSentence: defaultValue?.translatedExampleSentence ?? '',
        },
      });

    function onFormSubmit(data: FormFields) {
        const flashCard = data as FlashCard;
        flashCard.id = defaultValue?.id;
        onSubmit(data as FlashCard);
        reset();
    }

    function validateExampleSentence(value: string){
        if (value && value.trim() === "") {
            return "Sentence cannot contain only spaces";
          }
          return true;
    }

    useEffect(() => {
        reset()
    }, [defaultValue, reset]);

    return <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <FormControl isRequired isInvalid={!!errors.foreignWord}>
            <FormLabel>Foreign Word</FormLabel>
            <Input maxLength={100} placeholder='Enter the word'
                {...register("foreignWord", { required: "Foreign word is required" })}
            />
            <FormErrorMessage>{errors.foreignWord?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={6} isRequired isInvalid={!!errors.translatedWord}>
            <FormLabel>Translated Word</FormLabel>
            <Input maxLength={100} placeholder='Enter the word'
                {...register("translatedWord", { required: "Translated word is required" })}
            />
            <FormErrorMessage>{errors.translatedWord?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={6} isInvalid={!!errors.foreignExampleSentence}>
            <FormLabel>Example sentence</FormLabel>
            <Input maxLength={300} placeholder='Enter the sentence'
                {...register("foreignExampleSentence", {
                    validate: validateExampleSentence
                  })}
            />
            <FormErrorMessage>{errors.foreignExampleSentence?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={6} isInvalid={!!errors.translatedExampleSentence}>
            <FormLabel>Translated example sentence</FormLabel>
            <Input maxLength={300} placeholder='Enter the sentence'
                {...register("translatedExampleSentence", {
                    validate: validateExampleSentence
                  })}
            />
            <FormErrorMessage>{errors.translatedExampleSentence?.message}</FormErrorMessage>
        </FormControl>
    </form>
}