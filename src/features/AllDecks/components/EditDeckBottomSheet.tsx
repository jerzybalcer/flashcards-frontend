import { useRef } from "react";
import { Text } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { AddDeckForm } from "./AddDeckForm";
import { Deck } from "@/model/Deck";
import { useEditDeck } from "../hooks/useEditDeck";
import { EditedDeck } from "@/model/EditedDeck";

interface Props {
    isOpen: boolean;
    deck: Deck;
    onClose: () => void;
}

export const EditDeckBottomSheet: React.FC<Props> = ({ isOpen, deck, onClose }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const { handleSave, handleClose } = useEditDeck(onClose);

    function handleConfirm() {
        formRef.current?.requestSubmit();
    }

    function getHeader() {
        return <Text fontWeight='bold'>Edit deck</Text>;
    }

    function getBody() {
        return <AddDeckForm formRef={formRef} onSubmit={(deck) => handleSave(deck as EditedDeck)} defaultValue={deck} />;
    }

    return <BottomSheet isOpen={isOpen} confirmText="Save" onConfirm={handleConfirm} header={[getHeader()]} body={[getBody()]} closeButtonVisible onClose={handleClose} />
}