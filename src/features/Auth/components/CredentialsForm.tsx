import { PasswordInput } from "@/shared/components/PasswordInput";
import { Flex, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AuthMode } from "../model/AuthMode";

interface FormFields {
    email: string;
    password: string;
}

interface Props {
    formRef: React.Ref<HTMLFormElement>;
    onSubmit: (email: string, password: string) => void;
    isDisabled: boolean;
    authMode: AuthMode;
}

export const CredentialsForm: React.FC<Props> = ({ formRef, onSubmit, isDisabled, authMode }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

    function onFormSubmit(data: FormFields) {
        onSubmit(data.email, data.password);
    }

    const getPasswordRequirements = () => {
        if(authMode === 'register'){
            return {
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'
                }
            }
        }else{
            return {};
        }
    }

    return (
    <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="on">
        <Flex direction='column' gap={4}>
            <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input 
                    {...register("email", 
                        { 
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Use valid email format'
                            }
                        }
                    )}
                    placeholder="your@email.com" 
                    isDisabled={isDisabled} 
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput 
                    {...register("password", 
                        { 
                            required: "Password is required",
                            ...getPasswordRequirements()
                        }
                    )}
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