import { useRef, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Text } from "@chakra-ui/react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { FileInputForm } from "@/features/Deck/components/FileInputForm";
import { AddFlashCardForm } from "@/features/Deck/components/AddFlashCardForm";
import { useAddCard } from "../../hooks/mutations/useAddCard";
import { useAddCardsFromFile } from "../../hooks/mutations/useAddCardsFromFile";
import { FlashCard } from "@/model/FlashCard";


interface Props {
    isOpen: boolean;
    deckId: number;
    onClose: () => void;
}

export const AddCardBottomSheet: React.FC<Props> = ({ isOpen, deckId, onClose }) => {
    const { handleSave, isLoading: isAddCardLoading } = useAddCard(deckId);
    const { handleAddFile, isLoading: isAddFileLoading } = useAddCardsFromFile(deckId);

    const formRef = useRef<HTMLFormElement>(null);
    const fileFormRef = useRef<HTMLFormElement>(null);

    const [currentTab, setCurrentTab] = useState<number>(0);
    const addingFromFile = currentTab === 1;

    function handleConfirm() {
        addingFromFile ? fileFormRef.current?.requestSubmit() : formRef.current?.requestSubmit();
    }

    function handleSubmit(flashcard: FlashCard) {
        handleSave(flashcard).then(() => onClose());
    }

    function handleFileSubmit(file: File, delimiter: string) {
        handleAddFile(file, delimiter).then(() => onClose());
    }

    function getHeader() {
        return <Text fontWeight='bold'>New card</Text>;
    }

    function getBody() {
        return (
            <Tabs isFitted onChange={(index) => setCurrentTab(index)}>
                <TabList>
                    <Tab>Manually</Tab>
                    <Tab>From file</Tab>
                </TabList>
                <TabPanels pt={4}>
                    <TabPanel>
                        <AddFlashCardForm formRef={formRef} onSubmit={handleSubmit} />                    
                    </TabPanel>
                    <TabPanel>
                        <FileInputForm formRef={fileFormRef} onSubmit={handleFileSubmit}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
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
            isConfirmLoading={addingFromFile ? isAddFileLoading : isAddCardLoading}/>
    );
}