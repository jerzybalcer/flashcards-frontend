
import { FlashCard } from "@/model/FlashCard";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { FlashCardInputForm } from "@/shared/components/FlashCardInputForm";
import { Text } from "@chakra-ui/react";
import { useEditCard } from "../../hooks/mutations/useEditCard";

interface Props {
    isOpen: boolean;
    flashCard: FlashCard;
    deckId: number;
    onClose: () => void;
}

export const EditCardBottomSheet: React.FC<Props> = ({ isOpen, flashCard, deckId, onClose }) => {
    const { setForeignWord, setTranslatedWord, setForeignExampleSentence, setTranslatedExampleSentence, handleSave, isLoading } = useEditCard(flashCard, deckId);

    function handleConfirm() {
        handleSave().then(() => onClose());
    }

    function getHeader(){
        return <Text fontWeight='bold'>Edit flashcard</Text>;
    }

    function getBody(){
        return <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
            translatednWordOnChange={(value) => setTranslatedWord(value)}
            foreignExampleSentenceOnChange={(value) => setForeignExampleSentence(value)}
            translatedExampleSentenceOnChange={(value) => setTranslatedExampleSentence(value)}
            foreignDefaultValue={flashCard.foreignWord}
            translatednWordDefaultValue={flashCard.translatedWord} 
            foreignExampleSentenceDefaultValue={flashCard.foreignExampleSentence}
            translatedExampleSentenceDefaultValue={flashCard.translatedExampleSentence}
            />        
    }
    
    return (
        <BottomSheet 
            isOpen={isOpen} 
            header={[getHeader()]} 
            body={[getBody()]} 
            confirmText="Save" 
            onConfirm={handleConfirm} 
            closeButtonVisible 
            onClose={onClose} 
            isConfirmLoading={isLoading}/>
    );
}