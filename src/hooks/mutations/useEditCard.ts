import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { FlashCard } from "../../model/FlashCard";
import { editCard } from "../../services/CardService";
import { successToast } from "../../utils/toasts";
import { QueryKeys } from "../queries/queryKeys";

export function useEditCard(flashCard: FlashCard, deckId: number) {
    const [foreignWord, setForeignWord] = useState<string>(flashCard.foreignWord);
    const [translatedWord, setTranslatedWord] = useState<string>(flashCard.translatedWord);
    const [foreignExampleSentence, setForeignExampleSentence] = useState<string | null>(flashCard.foreignExampleSentence);
    const [translatedExampleSentence, setTranslatedExampleSentence] = useState<string | null>(flashCard.translatedExampleSentence);
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
    }

    const mutation = useMutation(
        (card: FlashCard) => editCard(card),
        {
            onSuccess: () => handleSuccess('Succesfully saved card',`${foreignWord} - ${translatedWord}`),
        }
    );

    const isLoading = mutation.isLoading;

    async function handleSave() {
        const newFlashCard = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            id: flashCard.id,
            foreignExampleSentence: foreignExampleSentence,
            translatedExampleSentence: translatedExampleSentence
        } as FlashCard;

        await mutation.mutateAsync(newFlashCard);
    }

    useEffect(() => {
        setForeignWord(flashCard.foreignWord);
        setTranslatedWord(flashCard.translatedWord);
        setForeignExampleSentence(flashCard.foreignExampleSentence);
        setTranslatedExampleSentence(flashCard.translatedExampleSentence);
    }, [flashCard]);

    return { foreignWord, setForeignWord, translatedWord, setTranslatedWord, foreignExampleSentence, setForeignExampleSentence, translatedExampleSentence, setTranslatedExampleSentence, handleSave, isLoading }
}