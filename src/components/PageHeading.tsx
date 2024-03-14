import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"

interface PageHeadingProps {
    title: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return (
        <Box mb={4}>
            <Flex justify='space-between' px={4} py={2} align='center' my={2}>
                <SideMenu />
                <Heading>{title}</Heading>
            </Flex>
            <Divider />
        </Box>
    )
}