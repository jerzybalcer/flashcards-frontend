import { Flex } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconChevronLeft, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    canGoBack?: boolean;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ canGoBack = false }) => {
    const navigate = useNavigate();

    return (
        <Flex justify='space-between' align='center' mb={8}>
            {canGoBack && <IconChevronLeft cursor='pointer' size={32} onClick={() => navigate(-1)}/>}
            {!canGoBack && <IconHome cursor='pointer' size={32} onClick={() => navigate('/home')}/>}
            <SideMenu />
        </Flex>
    )
}