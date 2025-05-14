import { useEditCard } from "../../hooks/mutations/useEditCard";
import { FlashCard } from "../../model/FlashCard";
import { FlashCardInputForm } from "../FlashCardInputForm";
import { BottomSheet } from "./BottomSheet";
import { Text } from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    flashCard: FlashCard;
    deckId: number;
    onClose: () => void;
}

export const EditCardBottomSheet: React.FC<Props> = ({ isOpen, flashCard, deckId, onClose }) => {
    const { setForeignWord, setTranslatedWord, handleSave, isLoading } = useEditCard(flashCard, deckId);

    function handleConfirm() {
        handleSave().then(() => onClose());
    }

    function getHeader(){
        return <Text fontWeight='bold'>Edit deck</Text>;
    }

    function getBody(){
        return <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
            translatednWordOnChange={(value) => setTranslatedWord(value)}
            foreignDefaultValue={flashCard.foreignWord}
            translatednWordDefaultValue={flashCard.translatedWord} />        
    }
    
    return (
        <BottomSheet 
            isOpen={isOpen} 
            header={[getHeader()]} 
            body={[getBody()]} 
            confirmText="Save" 
            onConfirm={handleConfirm} 
            canClose 
            onClose={onClose} 
            isConfirmLoading={isLoading}/>
    );
}