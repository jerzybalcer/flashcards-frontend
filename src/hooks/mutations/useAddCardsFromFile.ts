import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';

export const useAddCardsFromFile = () => {
    const { apiClient } = useApiClient();

    const addCardsFromFile = async (deckId: number, file: File, delimiter: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('delimiter', delimiter)

        return apiClient
            .post(`/decks/${deckId}/file`, formData)
            .then(res => res.data as number)
            .catch((err: AxiosError) => Promise.reject(err));
    }

  return addCardsFromFile;
};
