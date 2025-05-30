import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { FlashCard } from "../../model/FlashCard";
import { addCard } from "../../services/DeckService";
import { successToast } from "../../utils/toasts";
import { QueryKeys } from "../queries/queryKeys";

export function useAddCard(deckId: number) {
    const [foreignWord, setForeignWord] = useState<string>("");
    const [translatedWord, setTranslatedWord] = useState<string>("");
    const [foreignExampleSentence, setForeignExampleSentence] = useState<string | null>(null);
    const [translatedExampleSentence, setTranslatedExampleSentence] = useState<string | null>(null);
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
    }

    const mutation = useMutation(
        (card: FlashCard) => addCard(deckId, card), 
        {
            onSuccess: () => handleSuccess('Succesfully saved card',`${foreignWord} - ${translatedWord}`),
        }
    );

    async function handleSave() {
        const newFlashCard = 
        {
            foreignWord: foreignWord,
            translatedWord: translatedWord,
            foreignExampleSentence: foreignExampleSentence,
            translatedExampleSentence: translatedExampleSentence,
        } as FlashCard;

        await mutation.mutateAsync(newFlashCard);
    }

    const isLoading = mutation.isLoading;

    return { foreignWord, setForeignWord, translatedWord, foreignExampleSentence, setForeignExampleSentence, translatedExampleSentence, setTranslatedExampleSentence, setTranslatedWord, handleSave, isLoading }
}