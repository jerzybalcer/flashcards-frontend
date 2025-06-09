import { Button } from "@chakra-ui/react";
import { IconVolume } from "@tabler/icons-react";
import { useSpeechSynthesis } from "../hooks/general/useSpeechSynthesis";
import { useEffect } from "react";

interface ReadAloudButtonProps {
    word: string;
    language: string;
    autoRead: boolean;
    canRead: boolean;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ word, language, autoRead, canRead }) => {
    const { readWord } = useSpeechSynthesis();

    const handleReadAloud = async (event?: React.MouseEvent) => {
        if(event){
            event.stopPropagation();
        }
        await readWord(word, language);
    };

    useEffect(() => {
        if(autoRead && canRead) handleReadAloud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, autoRead, canRead]);

    if(!canRead) return <></>;

    return <Button variant='ghost' h='100%' w='100%' p={0} onClick={(event) => handleReadAloud(event)}>
        <IconVolume size={32} opacity={0.8} />
    </Button>
};