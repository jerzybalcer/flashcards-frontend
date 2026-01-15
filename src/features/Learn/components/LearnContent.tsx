import React from "react";
import { Flex, Card, Box } from "@chakra-ui/react";
import { FlippableFlashCard } from "./FlippableFlashCard/FlippableFlashCard";
import { FlashCard } from "@/model/FlashCard";

interface Props {
    flashcard: FlashCard;
    foreignLanguageId: string;
}

export const LearnContent: React.FC<Props> = ({ flashcard, foreignLanguageId }) => {
  return <Flex direction='column' justify='space-between' align='center'>
            <Flex w='80dvw' h='45dvh' position='relative' justify='center'>
                <Card w='90%' h='100%' position='absolute' top={-6} filter='brightness(70%)'></Card>
                <Card w='95%' h='100%' position='absolute' top={-3} filter='brightness(80%)'></Card>
                <Box w='100%' h='100%' position='absolute'>
                    <FlippableFlashCard flashCard={flashcard} foreignLanguage={foreignLanguageId} />
                </Box>
            </Flex>
        </Flex>;
}
  