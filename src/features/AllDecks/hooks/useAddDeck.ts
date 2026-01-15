import { NewDeck } from "@/model/NewDeck";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { addDeck } from "@/shared/services/DeckService";
import { successToast } from "@/shared/utils/toasts";
import { useQueryClient, useMutation } from "react-query";


export function useAddDeck(onFormClose: () => void) {
    const queryClient = useQueryClient();

    const handleSuccess = (toastTitle: string, toastDescription: string) => {
        successToast(toastTitle, toastDescription);
        handleClose();
        queryClient.invalidateQueries(QueryKeys.allDecks);
    };

    const deckMutation = useMutation((deck: NewDeck) => addDeck(deck), 
    {
        onSuccess: (_, deck) => handleSuccess('Succesfully saved deck', deck.name),
    });

    const handleClose = () => {
        onFormClose();
    }

    const handleSave = (deck: NewDeck) => {
        deckMutation.mutate(deck);
    }

    return { handleSave, handleClose }
}