import { useMutation, useQueryClient } from "react-query";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { addCardsFromFile } from "@/shared/services/DeckService";
import { successToast } from "@/shared/utils/toasts";
import { FlashCardsFile } from "@/model/FlashCardsFile";

export function useAddCardsFromFile(deckId: number) {
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
    }
    
    const mutation = useMutation(
        (file: FlashCardsFile) => addCardsFromFile(deckId, file.file, file.delimiter), 
        {
            onSuccess: () => handleSuccess('Succesfully saved cards', `Unique cards from file imported`),
        }
    );

    async function handleAddFile(file: FlashCardsFile) {
        await mutation.mutateAsync(file);
    }

    const isLoading = mutation.isLoading;

    return { handleAddFile, isLoading };
}