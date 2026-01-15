import { Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    title: string;
    urlToGoBack?: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, urlToGoBack = '/home' }) => {
    const navigate = useNavigate();

    return (
        <Flex w='100%' justify='center' mb={12}>
            <Flex w='100%' maxW='1200px' justify='space-between' align='center'>
                <IconArrowLeft cursor='pointer' size={36} strokeWidth={1.25} opacity={0.8} onClick={() => navigate(urlToGoBack)}/>
                <Heading size='lg'>{title}</Heading>
                <SideMenu />
            </Flex>
        </Flex>

    )
}