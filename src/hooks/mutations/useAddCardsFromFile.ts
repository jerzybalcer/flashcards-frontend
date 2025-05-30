import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCardsFromFile } from "../../services/DeckService";
import { successToast } from "../../utils/toasts";
import { QueryKeys } from "../queries/queryKeys";

export function useAddCardsFromFile(deckId: number) {
    const [file, setFile] = useState<File>()
    const [delimiter, setDelimiter] = useState<string>('-');
    const queryClient = useQueryClient();

    function handleSuccess(toastTitle: string, toastDescription: string) {
        successToast(toastTitle, toastDescription);
        queryClient.invalidateQueries([QueryKeys.cards, deckId]);
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
    }
    
    const mutation = useMutation(
        (args: { file: File, delimiter: string }) => addCardsFromFile(deckId, args.file, args.delimiter), 
        {
            onSuccess: () => handleSuccess('Succesfully saved cards', `Unique cards from file imported`),
        }
    );

    async function handleAddFile() {
        await mutation.mutateAsync({file: file!, delimiter: delimiter});
    }

    const isLoading = mutation.isLoading;

    return { file, setFile, delimiter, setDelimiter, handleAddFile, isLoading };
}