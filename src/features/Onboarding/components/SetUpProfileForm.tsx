import { Language } from "@/model/Language";
import { UpdateProfileData } from "@/model/UpdateProfileData";
import { AvatarInput } from "@/shared/components/AvatarInput";
import { LanguageInput } from "@/shared/components/LanguageInput";
import { useLanguages } from "@/shared/hooks/queries/useLanguages";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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

    const name = watch('username');

    useEffect(() => {
        if(user && user.nativeLanguageId){
            const language = languages?.find(l => l.id === user.nativeLanguageId);
            if(language){
                setValue('nativeLanguage', language);
            }
        }
    }, [languages]);

    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
        <Flex direction='column' gap={4}>
            <FormControl isRequired isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input 
                    {...register("username", 
                        { 
                            required: "Username is required",
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/,
                                message: 'Username can only contain letters, numbers, and _'
                            }
                        }
                    )}
                    placeholder="john_doe" 
                    isDisabled={isDisabled} 
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
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
                        <AvatarInput onChange={field.onChange} name={name} defaultImageUrl={user?.profilePictureUrl ?? ''} />
                    )}
                />
                <FormErrorMessage>{errors.profilePicture?.message}</FormErrorMessage>
            </FormControl>
        </Flex>
        <button type="submit" hidden />
    </form>
    );
}