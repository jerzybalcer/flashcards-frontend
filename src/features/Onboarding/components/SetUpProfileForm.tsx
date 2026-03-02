import { Language } from "@/model/Language";
import { UpdateProfileData } from "@/model/UpdateProfileData";
import { AvatarInput } from "@/shared/components/AvatarInput";
import { LanguageInput } from "@/shared/components/LanguageInput";
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { Flex, FormLabel, Input, FormControl, FormErrorMessage, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUsernameValidation } from "../hooks/useUsernameValidation";

interface FormFields {
    username: string;
    nativeLanguage: Language;
    profilePicture: File;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (profileData: UpdateProfileData) => void;
    isDisabled: boolean;
}

export const SetUpProfileForm: React.FC<Props> = ({ formRef, onSubmit, isDisabled }) => {
    const { isFetching: languagesLoading, data: languages } = useLanguages();

    const user = getCurrentUser();

    const { register, control, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormFields>(
    { 
        defaultValues: 
        { 
            username: user?.username ?? '',
        },
    });

    async function onFormSubmit(data: FormFields) {
        const profileData: UpdateProfileData = {username: data.username, nativeLanguageId: data.nativeLanguage.id, profilePicture: data.profilePicture};
        onSubmit(profileData);
    }
    
    useEffect(() => {
        if(user && user.nativeLanguageId){
            const language = languages?.find(l => l.id === user.nativeLanguageId);
            if(language){
                setValue('nativeLanguage', language);
            }
        }
    }, [languages]);
    
    const usernameFormField = watch('username');
    const { error: usernameError, isLoading: usernameValidationLoading } = useUsernameValidation(usernameFormField);

    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <Flex direction='column' gap={4}>
            <FormControl isRequired isInvalid={!!usernameError}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                    <Input 
                        {...register("username")}
                        placeholder="john_doe" 
                        isDisabled={isDisabled} 
                    />
                    <InputRightElement>
                        {usernameValidationLoading && <Spinner size='sm' /> }
                        {!usernameValidationLoading && !usernameError && <IconCheck color='var(--chakra-colors-blue-200)'/>}
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{usernameError}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.nativeLanguage}>
                <FormLabel>Native language</FormLabel>
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
                <FormLabel>Profile picture</FormLabel>
                <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field }) => (
                        <AvatarInput onChange={field.onChange} name={usernameFormField} defaultImageUrl={user?.profilePictureUrl ?? ''} />
                    )}
                />
                <FormErrorMessage>{errors.profilePicture?.message}</FormErrorMessage>
            </FormControl>
        </Flex>
        <button type="submit" hidden />
    </form>
    );
}