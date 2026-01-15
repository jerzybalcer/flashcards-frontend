import { useQueryClient, useMutation } from "react-query";
import { FlashCard } from "@/model/FlashCard";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { editCard } from "@/shared/services/CardService";
import { successToast } from "@/shared/utils/toasts";


export function useEditCard(deckId: number) {
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
    }

    const mutation = useMutation(
        (card: FlashCard) => editCard(card),
        {
            onSuccess: (_, flashcard) => handleSuccess('Succesfully saved card',`${flashcard.foreignWord} - ${flashcard.translatedWord}`),
        }
    );

    const isLoading = mutation.isLoading;

    async function handleSave(flashcard: FlashCard) {
        if(flashcard.foreignExampleSentence === '') flashcard.foreignExampleSentence = null;
        if(flashcard.translatedExampleSentence === '') flashcard.translatedExampleSentence = null;
        
        await mutation.mutateAsync(flashcard);
    }

    return { handleSave, isLoading }
}