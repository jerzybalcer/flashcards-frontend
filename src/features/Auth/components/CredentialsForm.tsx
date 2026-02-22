import { PasswordInput } from "@/shared/components/PasswordInput";
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormFields {
    email: string;
    password: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (email: string, password: string) => void;
    isDisabled: boolean;
}

export const CredentialsForm: React.FC<Props> = ({ formRef, onSubmit, isDisabled }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    function onFormSubmit(data: FormFields) {
        onSubmit(data.email, data.password);
    }

    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="on">
        <Flex direction='column' gap={4}>
            <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input 
                    {...register("email", { required: "Email is required" })}
                    placeholder="your@email.com" 
                    isDisabled={isDisabled} 
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput 
                    {...register("password", { required: "Password is required" })}
                    placeholder="your password" 
                    isDisabled={isDisabled} 
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
        </Flex>
        <button type="submit" hidden />
    </form>
    );
}