
import { FlashCard } from "@/model/FlashCard";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { AddFlashCardForm } from "@/features/Deck/components/AddFlashCardForm";
import { Text } from "@chakra-ui/react";
import { useEditCard } from "../../hooks/mutations/useEditCard";
import { useRef } from "react";

interface Props {
    isOpen: boolean;
    flashCard: FlashCard;
    deckId: number;
    onClose: () => void;
}

export const EditCardBottomSheet: React.FC<Props> = ({ isOpen, flashCard, deckId, onClose }) => {
    const { handleSave, isLoading } = useEditCard(deckId);

    const formRef = useRef<HTMLFormElement>(null);

    function handleConfirm() {
        formRef.current?.requestSubmit();
    }

    function handleSubmit(flashCard: FlashCard) {
        handleSave(flashCard).then(() => onClose());
    }

    function getHeader(){
        return <Text fontWeight='bold'>Edit flashcard</Text>;
    }

    function getBody(){
        return <AddFlashCardForm formRef={formRef} onSubmit={handleSubmit} defaultValue={flashCard}/>        
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