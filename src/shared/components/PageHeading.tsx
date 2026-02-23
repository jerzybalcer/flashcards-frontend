import { Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    title: string;
    urlToGoBack?: string | null;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, urlToGoBack = '/dashboard' }) => {
    const navigate = useNavigate();

    return (
        <Flex w='100%' justify='center' mb={12}>
            <Flex w='100%' maxW='1200px' justify='space-between' align='center'>
                {urlToGoBack !== null &&
                (<IconArrowLeft cursor='pointer' size='32px' onClick={() => navigate(urlToGoBack)}/>) 
                }
                <Heading fontFamily='Playwrite US Modern' fontWeight={400} fontSize='h1' as='h1'>{title}</Heading>
                <SideMenu />
            </Flex>
        </Flex>

    )
}

