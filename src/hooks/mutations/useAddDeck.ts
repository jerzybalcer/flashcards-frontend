import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';
import { NewDeck } from "../../model/NewDeck";

export const useAddDeck = () => {
    const { apiClient } = useApiClient();

    const addDeck = async (deck: NewDeck) =>
        apiClient
            .post(`/decks`, 
                { name: deck.name, language_id: deck.languageId }, 
                { headers: {'Content-Type': 'application/json'} })
            .then(res => res.data as number)
            .catch((err: AxiosError) => Promise.reject(err));

  return addDeck;
};
