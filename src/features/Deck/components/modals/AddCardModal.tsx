import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { AddCardBottomSheet } from "../bottomSheets/AddCardBottomSheet";
import { AddCardDialog } from "../dialogs/AddCardDialog";

interface Props {
    deckId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const AddCardModal: React.FC<Props> = ({ deckId, isOpen, onClose }) => {
    const isMobile = useIsMobile();

    if(isMobile) {
        return <AddCardBottomSheet isOpen={isOpen} deckId={deckId} onClose={onClose}/>;
    }
    else{
        return <AddCardDialog isOpen={isOpen} onClose={onClose} flashCard={undefined} deckId={deckId}/>;
    }
}