import { Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    title: string;
    urlToGoBack?: string;
    onGoBack?: () => void;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, urlToGoBack = '/home', onGoBack=null }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if(onGoBack){
            onGoBack();
        }
        navigate(urlToGoBack);
    }

    return (
        <Flex w='100%' justify='center' mb={12}>
            <Flex w='100%' maxW='1200px' justify='space-between' align='center'>
                <IconArrowLeft cursor='pointer' size={36} strokeWidth={1.25} opacity={0.8} onClick={() => handleGoBack()}/>
                <Heading size='lg'>{title}</Heading>
                <SideMenu />
            </Flex>
        </Flex>

    )
}