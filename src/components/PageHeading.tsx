import { Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    title: string;
    canGoBack?: boolean;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, canGoBack = false }) => {
    const navigate = useNavigate();

    return (
        <Flex justify='space-between' align='center' mb={12}>
            {canGoBack && <IconArrowLeft cursor='pointer' size={36} strokeWidth={1.25} opacity={0.8} onClick={() => navigate(-1)}/>}
            {!canGoBack && <IconHome cursor='pointer' size={36} strokeWidth={1.25} opacity={0.8} onClick={() => navigate('/home')}/>}
            <Heading size='lg'>{title}</Heading>
            <SideMenu />
        </Flex>
    )
}