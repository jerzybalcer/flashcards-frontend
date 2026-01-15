import React from "react";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { ThreeDotsButton } from "@/shared/components/ThreeDotsButton";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { LearnSettingsModal } from "./LearnSettingsModal";

interface Props {
    currentCardNumber: number;
    cardsCount: number;
}

export const LearnHeader: React.FC<Props> = ({ currentCardNumber, cardsCount }) => {
    const learnSettingsModal = useDisclosure();

    return <Flex gap={2}>
                <ThreeDotsButton ariaLabel="Settings" onClick={learnSettingsModal.onToggle} />
                <LearnSettingsModal isOpen={learnSettingsModal.isOpen} onClose={learnSettingsModal.onClose}/>
                <ProgressBar currentValue={currentCardNumber} maxValue={cardsCount} />
            </Flex>;
}
  