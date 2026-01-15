import { useRef } from "react";
import { Text } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { useAddDeck } from '@/features/AllDecks/hooks/useAddDeck';
import { AddDeckForm } from "./AddDeckForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddDeckBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const { handleSave, handleClose } = useAddDeck(onClose);

    function handleConfirm() {
        formRef.current?.requestSubmit();
    }

    function getHeader() {
        return <Text fontWeight='bold'>New deck</Text>;
    }

    function getBody() {
        return <AddDeckForm formRef={formRef} onSubmit={handleSave} />;
    }

    return <BottomSheet isOpen={isOpen} confirmText="Save" onConfirm={handleConfirm} header={[getHeader()]} body={[getBody()]} closeButtonVisible onClose={handleClose} />
}