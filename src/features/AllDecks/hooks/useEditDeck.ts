import { EditedDeck } from "@/model/EditedDeck";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { editDeck } from "@/shared/services/DeckService";
import { successToast } from "@/shared/utils/toasts";
import { useQueryClient, useMutation } from "react-query";


export function useEditDeck(onFormClose: () => void) {
    const queryClient = useQueryClient();

    const handleSuccess = (toastTitle: string, toastDescription: string, deckId: number) => {
        successToast(toastTitle, toastDescription);
        handleClose();
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
    };

    const deckMutation = useMutation((deck: EditedDeck) => editDeck(deck), 
    {
        onSuccess: (_, deck) => handleSuccess('Succesfully edited deck', deck.name, deck.id),
    });

    const handleClose = () => {
        onFormClose();
    }

    const handleSave = (deck: EditedDeck) => {
        deckMutation.mutate(deck);
    }

    return { handleSave, handleClose }
}