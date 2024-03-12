import { Flex } from "@chakra-ui/react"
import { PageHeading } from "../components/PageHeading"
import { FlippableFlashCard } from "../components/FlippableFlashCard/FlippableFlashCard"

export const LearnPage = () => {
    return (
        <Flex direction='column'>
            <PageHeading title="Learn" />
            {/* <FlippableFlashCard /> */}
        </Flex>
    )
}