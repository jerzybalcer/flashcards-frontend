import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';
import { FlashCard } from "../../model/FlashCard";

export const useAddCard = () => {
    const { apiClient } = useApiClient();

    const addCard = async (deckId: number, card: FlashCard) =>
        apiClient
            .post(`/decks/${deckId}/cards`, 
                { foreign_word: card.foreignWord, translated_word: card.translatedWord }, 
                { headers: {'Content-Type': 'application/json'} })
            .then(res => res.data as number)
            .catch((err: AxiosError) => Promise.reject(err));

  return addCard;
};
