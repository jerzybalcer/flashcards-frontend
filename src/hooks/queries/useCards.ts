import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import { useApiClient } from './../general/useApiClient';
import { AxiosError } from "axios";
import { FlashCard } from "../../model/FlashCard";

export function useCards(deckId: number, isDisabled: boolean = false) {

    const { apiClient } = useApiClient();

    const getCards = async (deckId: number) => 
        apiClient
            .get(`/decks/${deckId}/cards`)
            .then(res => res.data as FlashCard[])
            .catch((err: AxiosError) => Promise.reject(err));

    return useQuery([QueryKeys.cards, deckId], () => getCards(Number(deckId)), { enabled: !isDisabled });
}