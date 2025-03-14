import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';
import { FlashCard } from '../../model/FlashCard';

export const useEditCard = () => {
  const { apiClient } = useApiClient();

  const editCard = async (card: FlashCard) =>
      apiClient
          .put(`/card/${card.id}`, 
              {foreign_word: card.foreignWord, translated_word: card.translatedWord, id: card.id}, 
              { headers: {'Content-Type': 'application/json'} })
          .catch((err: AxiosError) => Promise.reject(err));

  return editCard;
};
