import { BottomSheet } from "@/shared/components/BottomSheet";
import { FileInputForm } from "@/shared/components/FileInputForm";
import { FlashCardInputForm } from "@/shared/components/FlashCardInputForm";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useAddCard } from "../../hooks/mutations/useAddCard";
import { useAddCardsFromFile } from "../../hooks/mutations/useAddCardsFromFile";


interface Props {
    isOpen: boolean;
    deckId: number;
    onClose: () => void;
}

export const AddCardBottomSheet: React.FC<Props> = ({ isOpen, deckId, onClose }) => {
    const { setForeignWord, setTranslatedWord, setForeignExampleSentence, setTranslatedExampleSentence, handleSave, isLoading: isAddCardLoading } = useAddCard(deckId);
    const { setFile, setDelimiter, handleAddFile, isLoading: isAddFileLoading } = useAddCardsFromFile(deckId);

    const [currentTab, setCurrentTab] = useState<number>(0);
    const addingFromFile = currentTab === 1;

    function handleConfirm() {
        if(addingFromFile){
            handleAddFile().then(() => handleClose());
        }
        else{
            handleSave().then(() => handleClose());
        }
    }

    function handleClose(){
        setForeignWord('');
        setTranslatedWord('');
        setFile(undefined);
        onClose();
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
                        <FlashCardInputForm foreignWordOnChange={(value) => setForeignWord(value)} 
                        translatednWordOnChange={(value) => setTranslatedWord(value)}
                        foreignExampleSentenceOnChange={(value) => setForeignExampleSentence(value)}
                        translatedExampleSentenceOnChange={(value) => setTranslatedExampleSentence(value)}
                        foreignDefaultValue={''}
                        translatednWordDefaultValue={''}
                        foreignExampleSentenceDefaultValue={null}
                        translatedExampleSentenceDefaultValue={null} />                    
                    </TabPanel>
                    <TabPanel>
                        <FileInputForm onFileChange={(file) => setFile(file)} onDelimiterChange={(delimiter) => setDelimiter(delimiter)}/>
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
            onClose={handleClose} 
            isConfirmLoading={addingFromFile ? isAddFileLoading : isAddCardLoading}/>
    );
}