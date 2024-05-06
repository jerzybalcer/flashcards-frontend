import { Button } from "@chakra-ui/react";
import { IconVolume } from "@tabler/icons-react";

interface ReadAloudButtonProps {
    word: string;
    language: string;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ word, language }) => {

    const handleReadAloud = (event: React.MouseEvent) => {
        event.stopPropagation();
        const readableWord = new SpeechSynthesisUtterance(word);
        readableWord.lang = language;
        window.speechSynthesis.speak(readableWord);
    };

    return <Button variant='ghost' h='100%' w='100%' p={0} onClick={(event) => handleReadAloud(event)}>
        <IconVolume size={32} opacity={0.8} />
    </Button>
};