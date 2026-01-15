import { useIsMobile } from "@/shared/hooks/general/useIsMobile";
import { Deck } from "@/model/Deck";
import { EditDeckBottomSheet } from "./EditDeckBottomSheet";

interface Props {
    isOpen: boolean;
    deck: Deck;
    onClose: () => void;
}

export const EditDeckModal: React.FC<Props> = ({ isOpen, deck, onClose }) => {
    const isMobile = useIsMobile();

    if(isMobile){
        return <EditDeckBottomSheet isOpen={isOpen} onClose={onClose} deck={deck} />

    }else {
        return <EditDeckBottomSheet isOpen={isOpen} onClose={onClose} deck={deck} />
    }
}