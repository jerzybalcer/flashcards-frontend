import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';

export const useDeleteDeck = () => {
    const { apiClient } = useApiClient();

    const deleteDeck = async (id: number) =>
        apiClient
            .delete(`/decks/${id}`)
            .catch((err: AxiosError) => Promise.reject(err));

  return deleteDeck;
};
