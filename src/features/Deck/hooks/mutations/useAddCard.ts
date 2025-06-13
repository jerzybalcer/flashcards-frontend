import { useQueryClient, useMutation } from "react-query";
import { FlashCard } from "@/model/FlashCard";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { addCard } from "@/shared/services/DeckService";
import { successToast } from "@/shared/utils/toasts";


export function useAddCard(deckId: number) {
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
    }

    const mutation = useMutation(
        (card: FlashCard) => addCard(deckId, card), 
        {
            onSuccess: (_, card) => handleSuccess('Succesfully saved card',`${card.foreignWord} - ${card.translatedWord}`),
        }
    );

    async function handleSave(deck: FlashCard) {
        await mutation.mutateAsync(deck);
    }

    const isLoading = mutation.isLoading;

    return { handleSave, isLoading };
}