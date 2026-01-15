import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { FlashCard } from "@/model/FlashCard";
import { EditCardBottomSheet } from "../bottomSheets/EditCardBottomSheet";

interface Props {
    flashCard: FlashCard;
    deckId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const EditCardModal: React.FC<Props> = ({ flashCard, deckId, isOpen, onClose }) => {
    const isMobile = useIsMobile();

    if(isMobile) {
        return <EditCardBottomSheet isOpen={isOpen} flashCard={flashCard} deckId={Number(deckId)} onClose={onClose}/>
    }
    else{
        // TODO: Change this to dialog
        return <EditCardBottomSheet isOpen={isOpen} flashCard={flashCard} deckId={Number(deckId)} onClose={onClose}/>;
    }
}