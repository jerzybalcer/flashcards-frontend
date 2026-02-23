import { CardLayout } from "@/shared/components/CardLayout";
import { Flex, Text } from "@chakra-ui/react";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { CustomizeForm } from "./CustomizeForm";
import { useRef } from "react";

export const CustomizeCard = () => {
    const formRef = useRef<HTMLFormElement>(null);

    function getHeader(){
        return [<Text fontSize='h1' fontWeight={700}>Make your account truly yours</Text>];
    }

    function getBody(){
        return [
            <CustomizeForm formRef={formRef} isDisabled={false} onSubmit={() => {}} />
        ];
    }

    function getFooter(){
        return [
            <Flex direction='column' gap={4} align='center'>
                <PrimaryButton text='Finish setup' onClick={() => {}} />
                <Text fontSize='lb'>You can always personalize your account later</Text>
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