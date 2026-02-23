import { Language } from "@/model/Language";
import { AvatarInput } from "@/shared/components/AvatarInput";
import { LanguageInput } from "@/shared/components/LanguageInput";
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

interface FormFields {
    name: string;
    nativeLanguage: Language;
    profilePicture: File;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (email: string, nativeLanguage: Language) => void;
    isDisabled: boolean;
}

export const CustomizeForm: React.FC<Props> = ({ formRef, onSubmit, isDisabled }) => {
    // const { isFetching: languagesLoading, data: languages } = useLanguages();
    const languages: Language[] = [{ id: 'en', name: 'English' }];
    const languagesLoading = false;

    const { register, control, watch, handleSubmit, formState: { errors } } = useForm<FormFields>(
        { 
            defaultValues: 
                { 
                    nativeLanguage: { id: 'en', name: 'English' }
                },
        });

    function onFormSubmit(data: FormFields) {
        onSubmit(data.name, data.nativeLanguage);
    }

    const name = watch('name');

    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <Flex direction='column' gap={4}>
            <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Your name</FormLabel>
                <Input 
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe" 
                    isDisabled={isDisabled} 
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.nativeLanguage}>
                <FormLabel>Your native language</FormLabel>
                <Controller
                    name="nativeLanguage"
                    control={control}
                    rules={{ required: "Language is required" }}
                    render={({ field }) => (
                        <LanguageInput
                            languages={languages ?? []}
                            isLoading={languagesLoading}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <FormErrorMessage>{errors.nativeLanguage?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.profilePicture}>
                <FormLabel>Your profile picture</FormLabel>
                <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field }) => (
                        <AvatarInput onChange={field.onChange} name={name} />
                    )}
                />
                <FormErrorMessage>{errors.profilePicture?.message}</FormErrorMessage>
            </FormControl>
        </Flex>
        <button type="submit" hidden />
    </form>
    );
}