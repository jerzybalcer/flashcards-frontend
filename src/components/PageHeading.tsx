import { Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeadingProps {
    title: string;
    withBackButton?: boolean;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, withBackButton = false }) => {
    const navigate = useNavigate();

    return (
        <Flex justify='space-between' align='center' mb={8}>
            <Flex align='center'>
                {withBackButton && <IconChevronLeft cursor='pointer' size={32} onClick={() => navigate(-1)}/>}
                <Heading>{title}</Heading>
            </Flex>
            <SideMenu />
        </Flex>
    )
}