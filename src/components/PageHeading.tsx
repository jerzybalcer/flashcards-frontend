import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { SideMenu } from "./SideMenu"

interface PageHeadingProps {
    title: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return (
        <Box mb={4}>
            <Flex justify='space-between' p={2} align='center'>
                <SideMenu />
                <Heading>{title}</Heading>
            </Flex>
            <Divider margin={2}/>
        </Box>
    )
}