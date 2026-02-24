import { CardLayout } from "@/shared/components/CardLayout";
import { Flex, Text } from "@chakra-ui/react";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { SetUpProfileForm } from "./SetUpProfileForm";
import { useRef } from "react";
import { useUpdateProfile } from "@/shared/hooks/mutations/useUpdateProfile";
import { UpdateProfileData } from "@/model/UpdateProfileData";
import { useNavigate } from "react-router-dom";

export const SetUpProfileCard = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const { handleSave } = useUpdateProfile();

    function handleFinishSetup(){
        formRef.current?.requestSubmit();
    }

    function handleSubmit(profileData: UpdateProfileData){
        handleSave(profileData).then(() => {
            navigate('/');
        });
    }

    function getHeader(){
        return [<Text fontSize='h1' fontWeight={700}>Set up your profile</Text>];
    }

    function getBody(){
        return [
            <SetUpProfileForm formRef={formRef} isDisabled={false} onSubmit={handleSubmit} />
        ];
    }

    function getFooter(){
        return [
            <Flex direction='column' gap={4} align='center'>
                <PrimaryButton text='Finish setup' onClick={handleFinishSetup} />
                <Text fontSize='lb' textAlign='center'>You can always personalize your account later</Text>
            </Flex>
        ];
    }

    return (
        <CardLayout 
            header={getHeader()} 
            body={getBody()}
            footer={getFooter()}
        />
    );
}