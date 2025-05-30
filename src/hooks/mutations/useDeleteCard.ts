import { useQueryClient, useMutation } from "react-query";
import { deleteCard } from "../../services/CardService";
import { successToast } from "../../utils/toasts";
import { QueryKeys } from "../queries/queryKeys";
import { FlashCard } from "../../model/FlashCard";

export function useDeleteCard(deckId: number, flashCard: FlashCard) {
    const queryClient = useQueryClient();

    const handleDeleteSuccess = () => {
        queryClient.invalidateQueries({predicate: (query) => query.queryKey.includes(QueryKeys.cards) && (query.queryKey as number[]).includes(Number(deckId))});
        queryClient.invalidateQueries([QueryKeys.deck, deckId]);
        successToast('Card deleted', `${flashCard.foreignWord} - ${flashCard.translatedWord}`);
    };

    const mutation = useMutation((id: number) => deleteCard(id), 
    {
        onSuccess: handleDeleteSuccess,
    });

    const handleDeleteCard = async () => {
        await mutation.mutateAsync(flashCard.id as number);
    };

    const isLoading = mutation.isLoading;

    return { handleDeleteCard, isLoading };
}