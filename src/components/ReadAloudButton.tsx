import { Button } from "@chakra-ui/react";
import { IconVolume } from "@tabler/icons-react";
import { useSpeechSynthesis } from "../hooks/general/useSpeechSynthesis";
import { useEffect } from "react";

interface ReadAloudButtonProps {
    word: string;
    language: string;
    autoRead: boolean;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ word, language, autoRead }) => {
    const { readWord, isAvailable } = useSpeechSynthesis();

    const isSpeechSynthesisAvailable = isAvailable(language);

    const handleReadAloud = (event?: React.MouseEvent) => {
        if(event){
            event.stopPropagation();
        }
        readWord(word, language);
    };

    useEffect(() => {
        if(autoRead && isSpeechSynthesisAvailable) handleReadAloud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, autoRead]);

    if(!isSpeechSynthesisAvailable) return <></>;

    return <Button variant='ghost' h='100%' w='100%' p={0} onClick={(event) => handleReadAloud(event)}>
        <IconVolume size={32} opacity={0.8} />
    </Button>
};